const app = {};

app.ui = {
   setup: () => {
      console.log('app.js is running...');
      fetchJson.enableLogger();
      }
   };

app.action = {
   getBook: (button) => {
      const id = button.data().book;
      const url = 'rest/book/' + id;
      const handleBooks = (data) => {
         $('output').hide().html(window.prettyPrintJson.toHtml(data)).fadeIn();
         };
      $('cite').text(window.location + url);
      fetchJson.get(url).then(handleBooks);
      },
   getBooks: () => {
      const url = 'rest/book/list';
      const handleBooks = (data) => {
         $('output').hide().html(window.prettyPrintJson.toHtml(data)).fadeIn();
         };
      $('cite').text(window.location + url);
      fetchJson.get(url).then(handleBooks);
      },
   deleteBook: (button) => {
      const id = button.data().book;
      const url = 'rest/book/' + id;
      const handleBooks = (data) => {
         $('output').hide().html(window.prettyPrintJson.toHtml(data)).fadeIn();
         };
      $('cite').text(window.location + url + ' [DELETE]');
      fetchJson.delete(url).then(handleBooks);
      }
   };
