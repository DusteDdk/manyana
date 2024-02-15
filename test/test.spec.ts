import {Manyana} from '../src/manyana';

describe('Manyana', ()=>{

    it('resolves', async ()=>{
        const m = new Manyana();

        const v = m.get();

        await m.set(async ()=>23);

        await expect(v).resolves.toBe(23);
    });

    it('rejects', async()=>{
        const m = new Manyana();

        const v = m.get();

        m.set(async ()=>{
            throw new Error('42');
        });

        await expect(v).rejects.toThrow('42');
    });

    it('is stable', async ()=>{
        const m = new Manyana();

        const a = m.get();
        const b = m.get();
    
        m.set(async()=>10);

        const c = m.get();

        await expect(a).resolves.toBe(10);
        await expect(a).resolves.toBe(10);
        await expect(b).resolves.toBe(10);
        await expect(c).resolves.toBe(10);


    });


    it('resolves after impl runs as well', async ()=>{
        const m = new Manyana();

        m.set( async()=>new Promise(resolve=>setTimeout(()=>resolve(13),1)));

        await new Promise(resolve=> {
            setTimeout( ()=>resolve(true), 2);
        })
        const a = m.get();
        await expect(a).resolves.toBe(13);

    });

    it('throws if set is called more than once', async ()=>{
        const m = new Manyana();

        m.set( async ()=>3 );

        expect( ()=> m.set( async ()=>4)).toThrow('Can only be set once');
    });
});