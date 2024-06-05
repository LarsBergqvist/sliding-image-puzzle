import {
    isSolvable
} from './solvableChecker';
import { expect, test } from 'vitest'

test('Odd N and even inversions count should be solvable', () => {
    const array = [1, 8, 2,
        0, 4, 3,
        7, 6, 5
    ];
    expect(isSolvable(3, array)).toBeTruthy();
});

test('Odd N and odd inversions count should NOT be solvable', () => {
    const array = [1, 2, 8,
        0, 4, 3,
        7, 6, 5
    ];
    expect(isSolvable(3, array)).toBeFalsy();
});

test('Even N, odd inversions and blank tile row position (from bottom) is even should be solvable', () => {
    const array = [13, 2, 10, 3,
        1, 12, 8, 4,
        5, 0, 9, 6,
        15, 14, 11, 7
    ];
    expect(isSolvable(4, array)).toBeTruthy();
});

test('Even N, even inversions and blank tile row position (from bottom) is odd should be solvable', () => {
    const array = [6, 13, 17, 10,
        8, 9, 11, 0,
        15, 2, 12, 5,
        14, 3, 1, 4
    ];
    expect(isSolvable(4, array)).toBeTruthy();
});

test('Even N, even inversions and blank tile row position (from bottom) is even should NOT be solvable', () => {
    const array = [3, 9, 1, 15,
        14, 11, 4, 6,
        13, 0, 10, 12,
        2, 7, 8, 5
    ];
    expect(isSolvable(4, array)).toBeFalsy();
});