import "assets/css/error_page.css";

const ErrorPage = () => {
  return (
    <div className="text-black">
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t"></div>
        <span className="flex-shrink mx-4">UPS! Pagina no encontrada</span>
        <div className="flex-grow border-t "></div>
      </div>
      <p className="zoom-area">
        <b>DCC - DBM</b> <br />
      </p>
      <section className="error-container">
        <span>4</span>
        <span>
          <span className="screen-reader-text">0</span>
        </span>
        <span>4</span>
      </section>
    </div>
  );
};

export default ErrorPage;
