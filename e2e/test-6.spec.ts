import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector(
    'div:has-text("Harry Akbar Ali MunirCreate Your Job ProfileLinkedIn ProfileFill Profile with Li")'
  );
  await page.click(
    'div:has-text("Harry Akbar Ali MunirCreate Your Job ProfileLinkedIn ProfileFill Profile with Li")'
  );
  await page.waitForSelector('button:has-text("+ Add Experience")');
  await page.click('button:has-text("+ Add Experience")');
  await page.waitForSelector('button:has-text("Experience💾 Save Experience")');
  await page.click('button:has-text("Experience💾 Save Experience")');
  await page.waitForSelector('div:has-text("Name") input[type="text"]');
  await page.click('div:has-text("Name") input[type="text"]');
  await page.fill(
    'div:has-text("Name") input[type="text"]',
    "Harry Akbar Ali Munir"
  );
  await page.click('input[type="email"]');
  await page.fill('input[type="email"]', "harryakbar@gmail.com");
  await page.click('input[type="phone"]');
  await page.fill('input[type="phone"]', "86431498");
  await page.click('div:has-text("Company Name") input[type="text"]');
  await page.fill(
    'div:has-text("Company Name") input[type="text"]',
    "NTUC Enterprise"
  );
  await page.click('div:has-text("Role") input[type="text"]');
  await page.fill(
    'div:has-text("Role") input[type="text"]',
    "Software Engineer"
  );
  await page.check('label:has-text("I am currently working in this role")');
  await page.click('div:has-text("Start Date") input[type="text"]');
  await page.fill(
    'div:has-text("Start Date") input[type="text"]',
    "2022-08-01"
  );
  await page.click('textarea[type="textarea"]');
  await page.fill(
    'textarea[type="textarea"]',
    "I am working as a software engineer"
  );
  await page.click('button:has-text("+ Add Experience")');
  await page.click('input[type="text"]:nth-child(4)');
  await page.click('button:has-text("+ Add Education")');
  await page.waitForSelector('button:has-text("Studying Computer Science")');
  await page.click('button:has-text("Studying Computer Science")');
  await page.click('div:has-text("University") input[type="text"]');
  await page.fill(
    'div:has-text("University") input[type="text"]',
    "Universitas Indonesia"
  );
  await page.click('div:has-text("Degree") input[type="text"]');
  await page.fill('div:has-text("Degree") input[type="text"]', "Undergraduate");
  await page.click('div:has-text("Field of Study") input[type="text"]');
  await page.fill(
    'div:has-text("Field of Study") input[type="text"]',
    "Computer Science"
  );
  await page.click('div:has-text("Grade") input[type="text"]');
  await page.fill('div:has-text("Grade") input[type="text"]', "A");
});
