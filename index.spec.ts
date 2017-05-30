import * as dot from './index';

describe('ts-dot-prop methods', () => {
    let obj: any;

    beforeEach(() => {
        obj = {
            foo: {
                bar: 'unicorn'
            }
        };
    })

    it('should return the value when present', () => {
        const value: any = dot.get(obj, 'foo.bar');
        expect(value).toEqual('unicorn');
    });

    it('should return undefined when value not present', () => {
        const value: any = dot.get(obj, 'foo.nothing.deep');
        expect(value).toEqual(undefined);
    });

    it('should return default value when not present', () => {
        const value: any = dot.get(obj, 'foo.nothing.deep', 'default value');
        expect(value).toEqual('default value');
    });

    it('should set value when value exists', () => {
        dot.set(obj, 'foo.bar', 'b');
        expect(obj.foo.bar).toEqual('b');
    });

    it('should set value when value does not exists', () => {
        dot.set(obj, 'foo.baz', 'x');
        expect(obj.foo.baz).toEqual('x');
    });

    it('should return true when value exists', () => {
        const value: boolean = dot.has(obj, 'foo.bar');
        expect(value).toEqual(true);
    });

    it('should remove value', () => {
        dot.remove(obj, 'foo.bar');
        expect(obj.foo.bar).toEqual(undefined);
    });

});
