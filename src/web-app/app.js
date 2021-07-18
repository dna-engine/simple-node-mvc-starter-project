const app = {};

app.config = {
   restBase: 'http://localhost:2121/api/',
   };

app.ui = {
   logApiCall(method, path) {
      $('cite >code').text(method);
      $('cite >output').text(app.config.restBase + path);
      },
   handleBooks(data) {
      $('main >pre >output').hide().html(window.prettyPrintJson.toHtml(data)).fadeIn();
      },
   setup() {
      fetchJson.enableLogger();
      },
   };

app.action = {
   getBooks() {
      const path = 'books';
      app.ui.logApiCall('GET', path);
      fetchJson.get(app.config.restBase + path).then(app.ui.handleBooks);
      },
   getBook(button) {
      const id = button.data().book;
      const path = 'books/' + id;
      app.ui.logApiCall('GET', path);
      fetchJson.get(app.config.restBase + path).then(app.ui.handleBooks);
      },
   deleteBook(button) {
      const id = button.data().book;
      const path = 'books/' + id;
      app.ui.logApiCall('DELETE', path);
      fetchJson.delete(app.config.restBase + path).then(app.ui.handleBooks);
      },
   bogus() {
      const path = 'bogus';
      app.ui.logApiCall('GET', path);
      fetchJson.get(app.config.restBase + path).then(app.ui.handleBooks);
      },
   };
