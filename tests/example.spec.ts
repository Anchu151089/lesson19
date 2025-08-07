import { test, expect } from '@playwright/test';
import {ToDoItem} from "./toDoPage";

test.beforeEach(async ({ page }) => {

  const todo = new ToDoItem(page);
  await todo.goto();

});

test('has title', async ({ page }) => {

  const todo = new ToDoItem(page);
  await todo.addItems('item 1')
  await todo.visible()
  await page.pause()
});
test('create two items ', async ({ page }) => {

  const todo = new ToDoItem(page);
  await todo.addItems('item 1')
  await todo.addItems('item 2')

  const toDoItemNo =await  todo.visible()
  console.log('number of items added = '+ toDoItemNo);
  expect(toDoItemNo).toBe(2)
  await page.pause()
});

test('create an item and select that item', async ({ page }) => {

  const todo = new ToDoItem(page);
  await todo.addItems('item 1')
  await todo.selectItem();
  await todo.expectTodoCompleted()
  await page.pause()
});

test('create an item and select that item and delete that item', async ({ page }) => {

  const todo = new ToDoItem(page);
  await todo.addItems('item 1')
  await todo.selectItem();
  await todo.hover()
  await todo.button()
  await page.pause()
});

test('create two item and select one item and click clear completed', async ({ page }) => {

  const todo = new ToDoItem(page);
  await todo.addItems('item 1')
  await todo.selectItem();
  await todo.addItems('item 3')
  const toDoItemNo =  await todo.getCount()
  expect(toDoItemNo).toBe(2)
  await todo.completeButton()
  const toDoItemNoAfterDelete = await todo.getCount()
  expect(toDoItemNoAfterDelete).toBe(1)
  await page.pause()

});

test('create two item and click completed', async ({ page }) => {
  const todo = new ToDoItem(page);
  await todo.addItems('item 1')
  await todo.selectItem();
  await todo.addItems('item 34')
  await todo.completedLinkCheck()
  const toDoItemNo =await todo.getCount()
  expect(toDoItemNo).toBe(1)
  console.log(toDoItemNo)
  await page.pause()
});
test('create three item and click active', async ({ page }) => {

  const todo = new ToDoItem(page);
  await todo.addItems('item 1')
  await todo.selectItem();
  await todo.addItems('item 11')
  await todo.addItems('item 12')
  await todo.activeLinkCheck()
  const toDoItemNo =await todo.getCount()
  expect(toDoItemNo).toBe(2)
  console.log(toDoItemNo)
  await page.pause()
});
test('create three item select one and click All button', async ({ page }) => {

  const todo = new ToDoItem(page);
  await todo.addItems('item 1')
  await todo.selectItem();
  await todo.addItems('item 11')
  await todo.addItems('item 12')
  await todo.allButtonChecked()
  const toDoItemNo =await todo.getCount()
  expect(toDoItemNo).toBe(3)
  console.log(toDoItemNo)
  await page.pause()
});

