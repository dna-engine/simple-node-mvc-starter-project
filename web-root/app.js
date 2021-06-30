const app = {};

app.ui = {
   logApiCall(method, url) {
      $('cite >code').text(method);
      $('cite >output').text(window.location + url);
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
      const url = 'api/books';
      app.ui.logApiCall('GET', url);
      fetchJson.get(url).then(app.ui.handleBooks);
      },
   getBook(button) {
      const id = button.data().book;
      const url = 'api/books/' + id;
      app.ui.logApiCall('GET', url);
      fetchJson.get(url).then(app.ui.handleBooks);
      },
   deleteBook(button) {
      const id = button.data().book;
      const url = 'api/books/' + id;
      app.ui.logApiCall('DELETE', url);
      fetchJson.delete(url).then(app.ui.handleBooks);
      },
   bogus() {
      const url = 'api/bogus';
      app.ui.logApiCall('GET', url);
      fetchJson.get(url).then(app.ui.handleBooks);
      },
   };
