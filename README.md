A weird promise
===============
It might be neat to start waiting for a promise to resolve, before you've gotten around to starting the work.
This is a proxy class that lets you await a value before the code for obtaining that value has been provided.

Example
=======
``` TypeScript
import {Manyana} from 'Manyana';

// This thing just ain't got no time to care whether their client requests the results first, or sets the criteria for them results first..
class MyStatefulThing {
    private p = new Manyana();

    async showResults(client) {
        client.send(await p.get());
    }

    findResults(criteria) {
        p.set( ()=> promiseToFindStuff(criteria));
    }

}
```

Why?
====
Sometimes the only way to truly comprehend the badness of an idea, is to explore it further.
Was this a bad idea? Yes.

Oh god WHY?!
============
Look, I'm sorry! Okay?!