$(function(){
	//##############################################################//
	//########################HELPFUL FUNC##########################//
	//##############################################################//
	function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
	}


	function initSortable() {
	   $('.column-card-list').sortable({
	     connectWith: '.column-card-list',
	     placeholder: 'card-placeholder'
	   }).disableSelection();
	 }
	//##############################################################//
	//########################COLUMN OBJECT#########################//
	//##############################################################//
	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn(){
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $controls = $('<div>').addClass('controls');
			var $columnDelete = $('<button>').addClass('btn-delete btn-danger').text('x');
			var $columnAddCard = $('<button>').addClass('add-card btn-success').text('+');

			//EVENTS
			$columnDelete.click(function() {
        		self.removeColumn();
			});
			
			$columnAddCard.click(function() {
		        self.addCard(new Card(prompt("Enter the name of the card")));
			});

			// COLUMN CONSTRUCTION
		    $column.append($columnTitle)
		           .append($controls.append($columnDelete,$columnAddCard))
		           .append($columnCardList);
		    return $column;
		}
	}
	//Column methods
	Column.prototype = {
		addCard: function(card){
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	}
	//##############################################################//
	//##########################CARD OBJECT#########################//
	//##############################################################//
	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');

			$cardDelete.click(function() {
				self.removeCard();
			})

			$card.append($cardDelete)
				 .append($cardDescription);
			return $card;

		}
	}
	//card methods
	Card.prototype = {
		removeCard: function(){
			this.$element.remove();
		}
	}
	//##############################################################//
	//##########################TABLE OBJECT########################//
	//##############################################################//
	var board = {
		name: 'Kanban board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	}

	$('.create-column')
	  .click(function(){
		var name = prompt('Enter a column name');
		var column = new Column(name);
	    	board.addColumn(column);
	  });
	//##############################################################//
	//#######################TABLE INITIALIZATION###################//
	//##############################################################//
	// COLUMNS
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// CARDS
	var card1 = new Card('Lorem ipsum dolor sit amet, consectetur adipisicing elit. ');
	var card2 = new Card('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias fugiat perspiciatis repellat sed quasi, eius consequatur vitae ipsam officiis quod consectetur aut asperiores qui molestiae architecto adipisci.');
	var card3 = new Card('Laborum libero ipsam cumque, natus officia, velit sapiente dolores vero vitae quaerat, numquam consectetur quia blanditiis.');
	var card4 = new Card('Laborum libero ipsam cumque');
	var card5 = new Card ('Laborum libero ipsam cumque');
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
	doingColumn.addCard(card3);
	doneColumn.addCard(card4);
	doneColumn.addCard(card5);
});