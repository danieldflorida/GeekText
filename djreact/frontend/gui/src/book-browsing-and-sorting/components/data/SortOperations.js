const 
    BOOK_PRICE_LOW_TO_HIGH = 1,
    BOOK_PRICE_HIGH_TO_LOW = 2,
    RELEASE_DATE = 3,
    A_TO_Z = 4,
    Z_TO_A = 5,
    BOOK_RATING_LOW_TO_HIGH = 6,
    BOOK_RATING_HIGH_TO_LOW = 7,
    OLDEST_RELEASE_DATE = 8;

class SortOperations{
    constructor(){
        this.sortHighestBookByPrice = this.sortHighestBookByPrice.bind(this);
        this.sortZtoA = this.sortZtoA.bind(this);
        this.sortHighBookByRating = this.sortHighBookByRating.bind(this);
        this.sortLowestBookByRating = this.sortLowestBookByRating.bind(this);
        this.sortLowestBookByPrice = this.sortLowestBookByPrice.bind(this);
        this.sortAtoZ = this.sortAtoZ.bind(this);
        this.sortOldestRelease = this.sortOldestRelease.bind(this);
    }

    static get BOOK_PRICE_LOW_TO_HIGH(){ return BOOK_PRICE_LOW_TO_HIGH; }
    static get BOOK_PRICE_HIGH_TO_LOW(){ return BOOK_PRICE_HIGH_TO_LOW; }
    static get RELEASE_DATE(){ return RELEASE_DATE; }
    static get A_TO_Z(){ return A_TO_Z; }
    static get Z_TO_A(){ return Z_TO_A; }
    static get BOOK_RATING_LOW_TO_HIGH(){ return BOOK_RATING_LOW_TO_HIGH; }
    static get BOOK_RATING_HIGH_TO_LOW(){ return BOOK_RATING_HIGH_TO_LOW; }
    static get OLDEST_RELEASE_DATE(){ return OLDEST_RELEASE_DATE; }

    isLow(a, b){
        if(a > b) return 1;
        if(a < b) return -1;
        if(a === b) return 0;
    }

    getRatingAverage(obj){
        const arr = obj.rating_set;
        let val = 0;

        if(arr.length){
            arr.map(obj => {
                val += Number(obj.stars);
                return true;
            });

            val = val / arr.length;
        }

        return val;
    }
    
    sortHighBookByRating(books){
        return this.sortLowestBookByRating(books).reverse();
    }

    sortLowestBookByRating(books){
        return books.sort((a, b) => {
            return this.isLow(this.getRatingAverage(a), this.getRatingAverage(b));
        });
    }

    sortLowestBookByPrice(books){
        return books.sort((a, b) => {
            return this.isLow(parseFloat(a.price), parseFloat(b.price));
        });
    }

    sortHighestBookByPrice(books){
        return this.sortLowestBookByPrice(books).reverse();
    }

    sortAtoZ(books){
       return books.sort((a, b) => {
            return this.isLow(a.title[0], b.title[0]);
        });
    }

    sortZtoA(books){
        return this.sortAtoZ(books).reverse();
    }

    sortRelease(books){
        let sort = function(a, b){
            let a_arr = a.publicationDate.split('-');
            let b_arr = b.publicationDate.split('-');

            if(a_arr[0] > b_arr[0]) return 1;
            if(a_arr[0] < b_arr[0]) return -1;
            if(a_arr[0] === b_arr[0]){
                if(a_arr[1] > b_arr[1]) return 1;
                if(a_arr[1] < b_arr[1]) return -1;
                if(a_arr[1] === b_arr[1]){
                    if(a_arr[2] > b_arr[2]) return 1;
                    if(a_arr[2] < b_arr[2]) return -1;
                    if(a_arr[2] === b_arr[2]) return 0; 
                }
            }

        };
        
        console.log(books);
        return books.sort(sort).reverse();
    }

    sortOldestRelease(books){
        return this.sortRelease(books).reverse();
    }

    printBooks(books){
        books.forEach(element => {
            console.log(element.price);
        });
    }
}


export default SortOperations;