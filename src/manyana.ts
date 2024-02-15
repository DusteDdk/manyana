type Impl = () => Promise<any>;

export class Manyana {
    private promise: Promise<any>;
    private resolve: (value: any)=>void;
    private reject:  (value: any)=>void;
    private used=false;

    constructor() {
        this.promise = new Promise( (_res, _rej)=>{
            this.resolve = _res;
            this.reject = _rej;
        });
    }

    set(impl: Impl) {
        if(this.used) {
            throw new Error('Can only be set once');
        }
        this.used=true;
        impl()
            .then( v=> this.resolve(v))
            .catch(e=> this.reject(e));
    }

    get(): Promise<any> {
      return this.promise;  
    }

}