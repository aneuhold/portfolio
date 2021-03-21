// log the pageview with their URL
const pageView = (url: string): void => {
  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

export default pageView;
