const app = {};

app.ui = {
   setup() {
      fetchJson.enableLogger();
      },
   };

app.action = {
   getBook(button) {
      const id = button.data().book;
      const url = 'api/book/' + id;
      const handleBooks = (data) => {
         $('output').hide().html(window.prettyPrintJson.toHtml(data)).fadeIn();
         };
      $('cite').text(window.location + url + ' [GET]');
      fetchJson.get(url).then(handleBooks);
      },
   getBooks() {
      const url = 'api/book/list';
      const handleBooks = (data) => {
         $('output').hide().html(window.prettyPrintJson.toHtml(data)).fadeIn();
         };
      $('cite').text(window.location + url + ' [GET]');
      fetchJson.get(url).then(handleBooks);
      },
   deleteBook(button) {
      const id = button.data().book;
      const url = 'api/book/' + id;
      const handleBooks = (data) => {
         $('output').hide().html(window.prettyPrintJson.toHtml(data)).fadeIn();
         };
      $('cite').text(window.location + url + ' [DELETE]');
      fetchJson.delete(url).then(handleBooks);
      },
   };
