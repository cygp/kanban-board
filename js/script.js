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
  //random string
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
    //board
    var boardCreator = {
      addBoard: function(board) {
        this.element.appendChild(board.element);
      },
      element: document.querySelector('#kanban .board-container')
    };
    function Board(name)  {
          var self = this;
          this.name = name;
          this.id = randomString();
          this.element = generateTemplate('board-template', { name: this.name, id: this.id });
          //create column
          this.element.querySelector('.board').addEventListener('click', function (event) {
            if (event.target.classList.contains('btn-delete')) {
              self.removeBoard();
            }
            if (event.target.classList.contains('create-column')) {
              self.addColumn(new Column(prompt("Enter the name of the column")));
            }
          });
    }
    Board.prototype = {
      addColumn: function(column) {
        this.element.querySelector('.column-container').appendChild(column.element);
        initSortable(column.id);
      },
      removeBoard: function() {
        this.element.parentNode.removeChild(this.element);
      },
    };
    // add new Board
    document.querySelector('#kanban .create-board').addEventListener('click', function() {
              var name = prompt('Enter a board name');
              var board = new Board(name);
              boardCreator.addBoard(board);
    });
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
    // CREATING BOARDS
  var school = new Board('School');
  var work = new Board('Work');
  var training = new Board('Training');
  boardCreator.addBoard(school);
  boardCreator.addBoard(work);
  boardCreator.addBoard(training);

    // CREATING COLUMNS
  var schoolTodoColumn = new Column('To do');
  var schoolDoingColumn = new Column('Doing');
  var schoolDoneColumn = new Column('Done');
  var workTodoColumn = new Column('To do');
  var workDoingColumn = new Column('Doing');
  var workDoneColumn = new Column('Done');
  var trainingTodoColumn = new Column('To do');
  var trainingDoingColumn = new Column('Doing');
  var trainingDoneColumn = new Column('Done');

  // ADDING COLUMNS TO THE BOARD
  school.addColumn(schoolTodoColumn);
  school.addColumn(schoolDoingColumn);
  school.addColumn(schoolDoneColumn);
  work.addColumn(workTodoColumn);
  work.addColumn(workDoingColumn);
  work.addColumn(workDoneColumn);
  training.addColumn(trainingTodoColumn);
  training.addColumn(trainingDoingColumn);
  training.addColumn(trainingDoneColumn);

  // CREATING CARDS
  var schoolCard1 = new Card('New task');
  var schoolCard2 = new Card('Preparation for the test');
  var schoolCard3 = new Card('English - Homework');
  var workCard1 = new Card('SEO Reports');
  var workCard2 = new Card('Financial summary');
  var workCard3 = new Card('Implementation of the menu');
  var trainingCard1 = new Card('Intervals - bicycle');
  var trainingCard2 = new Card('Strength training');
  var trainingCard3 = new Card('Rowing');

  // ADDING CARDS TO COLUMNS
  schoolTodoColumn.addCard(schoolCard1);
  schoolDoingColumn.addCard(schoolCard2);
  schoolDoneColumn.addCard(schoolCard3);
  workTodoColumn.addCard(workCard1);
  workDoingColumn.addCard(workCard2);
  workDoneColumn.addCard(workCard3);
  trainingTodoColumn.addCard(trainingCard1);
  trainingDoingColumn.addCard(trainingCard2);
  trainingDoneColumn.addCard(trainingCard3);
  });
})();
