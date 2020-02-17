const app = {};

app.ui = {
   handleBooks(data) {
      $('main >pre >output').hide().html(window.prettyPrintJson.toHtml(data)).fadeIn();
      },
   setup() {
      fetchJson.enableLogger();
      },
   };

app.action = {
   getBook(button) {
      const id = button.data().book;
      const url = 'api/book' + (id ? '/' + id : '');
      $('cite >code').text('GET');
      $('cite >output').text(window.location + url);
      fetchJson.get(url).then(app.ui.handleBooks);
      },
   deleteBook(button) {
      const id = button.data().book;
      const url = 'api/book/' + id;
      $('cite >code').text('DELETE');
      $('cite >output').text(window.location + url);
      fetchJson.delete(url).then(app.ui.handleBooks);
      },
   bogus() {
      const url = 'api/bogus';
      $('cite >code').text('GET');
      $('cite >output').text(window.location + url);
      fetchJson.get(url).then(app.ui.handleBooks);
      },
   };
