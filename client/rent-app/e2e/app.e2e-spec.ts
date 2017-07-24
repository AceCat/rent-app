import { RentAppPage } from './app.po';

describe('rent-app App', () => {
  let page: RentAppPage;

  beforeEach(() => {
    page = new RentAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
