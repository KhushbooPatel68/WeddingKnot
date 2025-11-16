export function Welcome() {
  return (
    <section className="py-20 md:py-32 px-6 bg-card">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-foreground" data-testid="text-welcome-title">
            Welcome to the Celebration!
          </h2>
          <p className="text-lg md:text-xl font-montserrat text-muted-foreground tracking-wide" data-testid="text-welcome-subtitle">
            Love • Laughter • Dance • Traditions • Forever
          </p>
        </div>

        <div className="prose prose-lg max-w-3xl mx-auto">
          <p className="text-base md:text-lg font-montserrat leading-relaxed text-card-foreground" data-testid="text-welcome-message">
            The festivities have begun,
            and we're beyond thrilled to have you join us
            as we celebrate the magical union of
            <span className="font-playfair font-semibold text-primary"> Rohan & Hany </span>
            with a week full of joy, rituals, music, colour, and unforgettable memories!
          </p>
          <p className="text-base md:text-lg font-montserrat leading-relaxed text-card-foreground mt-6">
            Get ready for a vibrant journey through traditions and total masti—
            because every ceremony is crafted with love
            and every moment is meant to be celebrated with you!
          </p>
        </div>
      </div>
    </section>
  );
}
