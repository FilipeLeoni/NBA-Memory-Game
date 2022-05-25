let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    cards: null,

    setCard: function (id) {

        let card = this.cards.filter((card) => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true
            return true;
        }else {
            this.secondCard = card;
            this.lockMode = true;
            this.secondCard.flipped = true;
            return true;
        }

    },


    checkMatch: function() {
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },


    clearCards: function() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
      },
    
      checkGameOver() {
        return this.cards.filter((card) => !card.flipped).length == 0;
      },


    teams: ['lakers',
    'bucks',
    'gsw',
    'miami',
    'suns',
    'memphis',
    'nets',
    'dallas',
    'pistons',
    'bulls'],


    


    createCardsFromTeams: function () {
        this.cards = [];
    
        this.teams.forEach((team) => {
            this.cards.push(this.createPairFromTeam(team));
        });
    
         this.cards = this.cards.flatMap((pair) => pair);
         this.suffleCards();

         return this.cards;
    },
    
    createPairFromTeam: function (team){
    
    
        return [{
            id: this.createIdWithTeam(team),
            icon: team,
            flipped: false,
        }, {
            id: this.createIdWithTeam(team),
            icon: team,
            flipped: false,
        }];
    
    
    },
    
    createIdWithTeam: function (team) {
        return team + parseInt(Math.random() * 1000);
    },

    suffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while(currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },

    
};