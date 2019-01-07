const app = {};

app.ui = {
   setup: () => {
      console.log('app.js is running...');
      fetchJson.enableLogger();
      }
   };

app.action = {
   getBooks: (button) => {
      const id = button.data().book;
      const url = 'rest/book/' + (id || 'list');
      const handleBooks = (data) => {
         $('output').hide().html(window.prettyPrintJson.toHtml(data)).fadeIn();
         };
      $('cite').text(window.location + url);
      fetchJson.get(url).then(handleBooks);
      }
   };
