import json
import boto3
import re
import os
from datetime import datetime, timezone
from botocore.exceptions import ClientError

# Config via env vars
TABLE_NAME = os.environ.get("RSVP_TABLE_NAME", "WeddingRSVP")
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "https://www.rh2026.com")

# DynamoDB
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

CORS_HEADERS = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def now_iso():
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def normalize_mobile(mobile: str) -> str:
    if not mobile:
        return ""

    raw = re.sub(r"\D", "", mobile)

    if mobile.strip().startswith("+"):
        return f"+{raw}"

    if len(raw) == 10:
        return f"+91{raw}"

    if raw.startswith("91") and len(raw) >= 12:
        return f"+{raw}"

    if len(raw) >= 10:
        return f"+{raw}"

    return ""


def lambda_handler(event, context):
    # CORS preflight
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    try:
        body = json.loads(event.get("body", "{}"))
    except Exception:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"success": False, "message": "Invalid JSON"}),
        }

    name = (body.get("name") or "").strip()
    mobile_raw = (body.get("mobile") or "").strip()

    # Accept explicit boolean if provided; default to False when missing
    if "whatsapp_opt_in" in body:
        whatsapp_opt_in = bool(body.get("whatsapp_opt_in"))
    else:
        whatsapp_opt_in = False

    attending = body.get("attending", None)
    guest_count = body.get("guestCount", None)

    mobile = normalize_mobile(mobile_raw)

    if not name or not mobile:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"success": False, "message": "Valid name and mobile required"}),
        }

    # Coerce/validate optional fields
    attending_bool = None
    if isinstance(attending, bool):
        attending_bool = attending
    elif isinstance(attending, str):
        attending_bool = attending.lower() in ("1", "true", "yes")

    try:
        guest_count_int = int(guest_count) if guest_count is not None else None
        if guest_count_int is not None and guest_count_int < 0:
            guest_count_int = None
    except Exception:
        guest_count_int = None

    timestamp = now_iso()

    item = {
        "mobile": mobile,
        "name": name,
        "createdAt": timestamp,
        "opt_in_source": "RSVP_WEBSITE",
        "opt_in_timestamp": timestamp,
        "whatsapp_opt_in": whatsapp_opt_in,
    }
    if attending_bool is not None:
        item["attending"] = attending_bool
    if guest_count_int is not None:
        item["guestCount"] = guest_count_int

    # Save RSVP (prevent duplicates)
    try:
        table.put_item(Item=item, ConditionExpression="attribute_not_exists(mobile)")
    except ClientError as e:
        if e.response["Error"]["Code"] == "ConditionalCheckFailedException":
            try:
                existing = table.get_item(Key={"mobile": mobile}).get("Item")
            except Exception:
                existing = None
            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps({
                    "success": True,
                    "message": "Already registered",
                    "data": existing or {"mobile": mobile},
                    "whatsappSent": False,
                }),
            }

        print("DynamoDB error:", e)
        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps({"success": False, "message": "Failed to save RSVP"}),
        }

    # WhatsApp sending intentionally removed per request; just return success
    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({
            "success": True,
            "message": "RSVP successful",
            "data": {"mobile": mobile, "name": name, "whatsapp_opt_in": whatsapp_opt_in},
            "whatsappSent": False,
        }),
    }
