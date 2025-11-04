import Ship from "./ship";


const ship = new Ship(1);

test('without hit count', () => {
    expect(ship.hits).toBe(0);
})

test('ship sunk status before hit', () => {
    expect(ship.isSunk()).toBe(false);
})

test('after hit count increases', () => {
    ship.hit()
    expect(ship.hits).toBe(1)
})

test('ship sunk status after hit', () => {
    expect(ship.isSunk()).toBe(true);
})