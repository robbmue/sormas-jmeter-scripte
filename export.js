var pkg = JavaImporter(org.openqa.selenium); //WebDriver classes
var support_ui = JavaImporter(org.openqa.selenium.support.ui.WebDriverWait); //WebDriver classes
var ui = JavaImporter(org.openqa.selenium.support.ui); //import Selenium Support UI package
var wait = new support_ui.WebDriverWait(WDS.browser, 90000);

function waitForElement(id){
	wait.until(ui.ExpectedConditions.presenceOfElementLocated(pkg.By.id(id)));
}

function waitForElementCSS(css){
	wait.until(ui.ExpectedConditions.presenceOfElementLocated(pkg.By.cssSelector(css)));
}

function clickCSS(css){
    var element = WDS.browser.findElement(pkg.By.cssSelector(css));
    element.click();
    return element;
}

function clickID(id){
    var element = WDS.browser.findElement(pkg.By.id(id));
    element.click();
    return element;
}

function sendKeysAndEnter(e, s){
    e.sendKeys(s);
    waitAndClickCSS('.gwt-MenuItem > span');
    WDS.log.info('problematic ENTER sending...........................');
}

function waitAndClickCSS(css){
	var e = wait.until(ui.ExpectedConditions.presenceOfElementLocated(pkg.By.cssSelector(css)));
	e.click();
	return e;
}
function waitAndClickID(id){
	var e = wait.until(ui.ExpectedConditions.presenceOfElementLocated(pkg.By.id(id)));
	e.click();
	return e;
}

function machXMal(n, m) {
	var i;
	for (i = 0; i < n; i++) {
		m();
	}
}
function tryClickID(id){
	while(true){
		try {
			clickID(id);
			return true;
		} catch (e) {
			WDS.log.info('well');
		}
	}
}

function debug() {
	WDS.log.info('Start debug at.');
	waitForElement('forever');
	WDS.log.info('90000ms searched for element.');
}

function heyGibMalNeID() {
	return Math.random().toString(36).substring(7);	
}

function login() {
    waitAndClickID('username').sendKeys(['admin']);
    clickID('password').sendKeys(['sadmin']);
    clickID('Login.doLogIn');
    waitForElement('contacts');
    WDS.log.info("##### login finished #####");
}

function machMalNExport(){
	waitAndClickID('contacts');
	tryClickID('export');
	WDS.sampleResult.sampleStart(); //captures sampler's start time
     WDS.sampleResult.getLatency();
     WDS.log.info("Sample started");
	waitAndClickID('exportDetailed');
}
function openNewWindow(){
	WDS.browser.executeScript('window.open("http://sormas-docker-test.com/sormas-ui/login");')
}

function goToWindow(number){
	var handles = WDS.browser.getWindowHandles()
	var iterator = handles.iterator()
	var counter = 1;
	while (counter <= number)
	{
	   var handle = iterator.next()
	   WDS.browser.switchTo().window(handle)
	   WDS.log.info('Window ' + counter + ' title = ' + WDS.browser.getTitle())
	   counter++;
	}
}
function reload(){
	WDS.browser.navigate().refresh()
}
function bauDenDateinamenZusammen(){
	var thread = WDS.ctx.getThreadNum();
	WDS.log.info('thred: ' + thread)
	var currentDate = new Date()
	var month = ("0" + (currentDate.getMonth() + 1)).slice(-2)
	var day = ("0" + currentDate.getDate()).slice(-2)
	WDS.log.info(currentDate.getDate())
	var nameVonDieExport
	if(!thread){
		nameVonDieExport = 'sormas_contacts_' + currentDate.getFullYear() + '-' + month  + '-' + day + '.csv'
	} else {
		nameVonDieExport = 'sormas_contacts_' + currentDate.getFullYear() + '-' + month + '-' + currentDate.getDate() + '(' + thread + ').csv'
	}
	return nameVonDieExport;
}

function checkDenExport(){
	goToWindow(1);
	var nameVonDieExport = bauDenDateinamenZusammen()
	WDS.log.info(nameVonDieExport);
	while(true){
		reload ()
		try{
			WDS.browser.findElement(pkg.By.linkText(nameVonDieExport))
			WDS.log.info('Export found')
			WDS.sampleResult.sampleEnd();
			break;
		} catch (e) {
			WDS.log.info('element' + nameVonDieExport + ' not found')
		}

	}
}

function HAUPTFUNKTION(){
     WDS.browser.get('file:///home/rom/Downloads/');
     openNewWindow();
     goToWindow(2);
     login();
     machMalNExport();
     checkDenExport();
}

HAUPTFUNKTION();
