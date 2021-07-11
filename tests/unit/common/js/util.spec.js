import { deepCopy } from '@/common/js/utils'

describe('primitive values', () => {
  it('number value', () => {
    let num = 3;
    let valueCopied = deepCopy(num);
    expect(valueCopied).toEqual(num);
    num = 4;
    expect(valueCopied).toEqual(3);
  })
  it('string value', () => {
    let str = 'hello';
    let strCopied = deepCopy(str);
    expect(strCopied).toEqual(str);
    str = 'world';
    expect(strCopied).toEqual('hello');
  })
  it('boolean value', () => {
    let bool = false;
    let boolCopied = deepCopy(bool);
    expect(boolCopied).toEqual(bool);
    bool = true;
    expect(boolCopied).toEqual(false);
  })
})

describe('array', () => {
  it('empty array', () => {
    let arr = [];
    let newArr = deepCopy(arr);
    expect(newArr).toEqual(arr);
    arr.push(1);
    expect(newArr).toHaveLength(0);
  })
  it('single value array', () => {
    let arr = [1];
    let newArr = deepCopy(arr);
    expect(newArr).toEqual(arr);
    arr.pop();
    expect(newArr).toHaveLength(1);
  })
  it('normal array', () => {
    let arr = [1, 3, 3, 2, 4];
    let newArr = deepCopy(arr);
    expect(newArr).toEqual(arr);
    arr.sort();
    expect(newArr[2]).toEqual(3);
  })
  it('object array', () => {
    let arr = [
      'a',
      3,
      { name: 'Tom' }
    ]
    let newArr = deepCopy(arr);
    expect(newArr[2]).toMatchObject({ name: "Tom" });
    arr[2].name = 'Jerry';
    expect(newArr[2]).toMatchObject({ name: "Tom" });
  })
})

describe('object', () => {
  it('normal object', () => {
    let obj = {
      HOOKS: '钩子函数'
    }
    let newObj = deepCopy(obj);
    expect(newObj).toMatchObject({ HOOKS: '钩子函数' });
    obj.HOOKS = '狗子函数';
    expect(newObj).toMatchObject({ HOOKS: '钩子函数' });
  })
})