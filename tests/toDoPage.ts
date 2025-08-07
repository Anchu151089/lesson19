import {expect, Locator, Page} from "@playwright/test";


export class ToDoItem
{
    readonly page : Page
    readonly textInput : Locator;
    readonly toDoItemLabel : Locator;
    readonly todoItemToggle: Locator;
    readonly todoItem : Locator;
    readonly toDoItemButton : Locator;
    readonly clearCompleteButton : Locator;
    readonly completeLink : Locator;
    readonly activeLink : Locator;
    readonly selectAllLinks : Locator;

    constructor(page : Page)
    {
        this.page = page;
        this.textInput = page.getByTestId('text-input');
        this.toDoItemLabel = page.getByTestId('todo-item-label');
        this.todoItemToggle = page.getByTestId('todo-item-toggle');
        this.todoItem = page.getByTestId('todo-item');
        this.toDoItemButton = page.getByTestId('todo-item-button');
        this.clearCompleteButton = page.getByText('Clear completed');
        this.completeLink = page.getByRole('link', { name: 'Completed' });
        this.activeLink = page.getByRole('link', { name: 'Active' });
        this.selectAllLinks = page.getByRole('link', { name: 'All' });

    }

    async goto()
    {
        await this.page.goto('https://todo-app.tallinn-learning.ee/');
    }
    async addItems(text: string)
    {
        await this.textInput.fill(text);
        await this.textInput.press('Enter');

    }
    async visible()
    {
        await  expect(this.toDoItemLabel).toBeVisible({ timeout: 10000 });
    }
    async selectItem()
    {
        await this.todoItemToggle.click()
    }
    async expectTodoCompleted()
    {
        await expect(this.todoItem).toHaveClass(/completed/);
    }
    async hover()
    {
       await this.toDoItemLabel.hover()
    }
    async button()
    {
        await this.toDoItemButton.click()
    }
    async getCount()
    {
        return await this.toDoItemLabel.count()
    }
    async completeButton()
    {
        await this.clearCompleteButton.click()
    }
    async completedLinkCheck()
    {
        await this.completeLink.click()
    }
    async activeLinkCheck()
    {
        await this.activeLink.click()
    }
    async allButtonChecked()
    {
        await this.selectAllLinks.click()
    }

}