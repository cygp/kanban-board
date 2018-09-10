(function(){
  //init sortable
  function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
      group: 'kanban',
      sort: true
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    // board object
    var board = {
      name: 'Kanban Board',
      addColumn: function(column) {
        this.element.appendChild(column.element);
        initSortable(column.id);
      },
      element: document.querySelector('#board .column-container')
    };
    //Creating column 
    document.querySelector('#board .create-column').addEventListener('click', function() {
        var name = prompt('Enter a column name');
        var column = new Column(name);
        board.addColumn(column);
    });
    function randomString() {
      var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
      var str = '';
      for (var i = 0; i < 10; i++) {
          str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
      }
    // Mustache.js template
    function generateTemplate(name, data, basicElement) {
      var template = document.getElementById(name).innerHTML;
      var element = document.createElement(basicElement || 'div');

      Mustache.parse(template);
      element.innerHTML = Mustache.render(template, data);

      return element;
    }
    //Column class
    function Column(name) {
      var self = this;

      this.id = randomString();
      this.name = name;
      this.element = generateTemplate('column-template', { name: this.name, id: this.id });

      this.element.querySelector('.column').addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete')) {
          self.removeColumn();
        }

        if (event.target.classList.contains('add-card')) {
          self.addCard(new Card(prompt("Enter the name of the card")));
        }
      });
    }
    //column methods
    Column.prototype = {
      addCard: function(card) {
        this.element.querySelector('ul').appendChild(card.element);
      },
      removeColumn: function() {
        this.element.parentNode.removeChild(this.element);
      }
    };
    // Card class
    function Card(description) {
      var self = this;

      this.id = randomString();
      this.description = description;
      this.element = generateTemplate('card-template', { description: this.description }, 'li');
      this.element.querySelector('.card').addEventListener('click', function (event) {
        event.stopPropagation();

        if (event.target.classList.contains('btn-delete')) {
          self.removeCard();
        }
      });
    }
    //Card method
    Card.prototype = {
      removeCard: function() {
        this.element.parentNode.removeChild(this.element);
        }
    }
    
  });
})();
