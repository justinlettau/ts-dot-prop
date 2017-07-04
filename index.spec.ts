import * as dot from './index';

describe('ts-dot-prop methods', () => {
    let obj: any;

    beforeEach(() => {
        obj = {
            foo: 'bar',
            state: {
                name: 'New York'
            },
            fruit: [{
                type: 'Apple',
                color: 'Red'
            }]
        };
    })

    /**
     * Get
     */
    it('should return the shallow value when present', () => {
        const value: any = dot.get(obj, 'foo');
        expect(value).toEqual('bar');
    });

    it('should return the nested value when present', () => {
        const value: any = dot.get(obj, 'state.name');
        expect(value).toEqual('New York');
    });

    it('should return the array value when present', () => {
        const value: any = dot.get(obj, 'fruit[0].type');
        expect(value).toEqual('Apple');
    });

    it('should return undefined when value not present', () => {
        const value: any = dot.get(obj, 'state.capital');
        expect(value).toEqual(undefined);
    });

    it('should return default value when not present', () => {
        const value: any = dot.get(obj, 'state.population.total', 'not found');
        expect(value).toEqual('not found');
    });

    /**
     * Set
     */
    it('should set value when value exists', () => {
        dot.set(obj, 'state.name', 'Paris');
        expect(obj.state.name).toEqual('Paris');
    });

    it('should set value when value does not exists', () => {
        dot.set(obj, 'state.capital', 'Albany');
        expect(obj.state.capital).toEqual('Albany');
    });

    it('should set array value when value exists', () => {
        dot.set(obj, 'fruit[0].color', 'Green');
        expect(obj.fruit[0].color).toEqual('Green');
    });

    /**
     * Has
     */
    it('should return true when shallow value exists', () => {
        const value: boolean = dot.has(obj, 'foo');
        expect(value).toEqual(true);
    });

    it('should return true when deep value exists', () => {
        const value: boolean = dot.has(obj, 'state.name');
        expect(value).toEqual(true);
    });

    it('should return true when array value exists', () => {
        const value: boolean = dot.has(obj, 'fruit[0].type');
        expect(value).toEqual(true);
    });

    /**
     * Remove
     */
    it('should remove shallow value', () => {
        dot.remove(obj, 'foo');
        expect(obj.foo).toEqual(undefined);
    });

    it('should remove deep value', () => {
        dot.remove(obj, 'state.name');
        expect(obj.state.name).toEqual(undefined);
    });

    it('should remove array value', () => {
        dot.remove(obj, 'fruit[0].color');
        expect(obj.fruit[0].color).toEqual(undefined);
    });

    /**
     * Paths
     */
    it('should return an array of strings', () => {
        const value: string[] = dot.paths(obj);
        expect(value).toEqual(['foo', 'state.name', 'fruit']);
    });

    it('should return an empty array', () => {
        const value: string[] = dot.paths({});
        expect(value).toEqual([]);
    });

});
