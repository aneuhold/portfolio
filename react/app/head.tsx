/**
 * Head component that defines the HTML head metadata for the application.
 * Includes meta tags for character encoding, viewport, description, and external resources.
 */
export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <title>Anton G Neuhold Jr&apos;s Portfolio</title>
      <meta
        name="description"
        content="A portfolio with various projects and social links for the developer Anton G Neuhold Jr."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {/* Material Icons */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
      />
    </>
  );
}
