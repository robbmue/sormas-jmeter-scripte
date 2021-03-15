var pkg = JavaImporter(org.openqa.selenium); //WebDriver classes
var support_ui = JavaImporter(org.openqa.selenium.support.ui.WebDriverWait); //WebDriver classes
var ui = JavaImporter(org.openqa.selenium.support.ui); //import Selenium Support UI package
var wait = new support_ui.WebDriverWait(WDS.browser, 90000);
var Keys = JavaImporter(org.openqa.selenium.Keys); 

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
function tryClickCSS(id){
	var e;
	while(true){
		try {
			e = clickCSS(id);
			return e;
		} catch (e) {
			WDS.log.info('well');
		}
	}
}
function machXMal(n, m) {
	var i;
	for (i = 0; i < n; i++) {
		m();
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
    WDS.log.info("##### login started #####");
    clickID('username').sendKeys(['admin']);
    clickID('password').sendKeys(['sadmin']);
    clickID('Login.doLogIn');
    waitForElement('cases');
    WDS.log.info("##### login finished #####");
    
}

function addCase(){
	tryClickID('cases');
	tryClickID('caseNewCase');
	waitForElement('epidNumber')
	//waitForElementCSS('.v-captionwrapper > #disease > .v-filterselect-button');
     waitAndClickCSS('#reportDate > .v-datefield-button');
     waitAndClickCSS('.v-datefield-calendarpanel-day-today');
     var region = waitAndClickCSS('#region input');
     sendKeysAndEnter(region, 'Vor');
     var district = waitAndClickCSS('#district input');
     sendKeysAndEnter(district, 'Vor');
	waitAndClickCSS('#facilityOrHome > .v-radiobutton:nth-child(2) > label');
	waitAndClickID('healthFacilityDetails').sendKeys('Straße an der Hauptstraße 13');
     waitAndClickID('firstName').sendKeys(heyGibMalNeID());
     waitAndClickID('lastName').sendKeys(heyGibMalNeID());
     //var illness = tryClickCSS('#disease input');
     //sendKeysAndEnter(illness, 'COV');
     var sex = waitAndClickCSS('#sex input')
     sendKeysAndEnter(sex,'Divers');
     clickID('commit');
     waitForElementCSS('.v-Notification')
}


function HAUPTFUNKTION(){
    WDS.log.info("##### driver started #####");
    WDS.browser.get('http://sormas-docker-test.com/sormas-ui/login');
    WDS.log.info("##### got to page #####");
    login();
    WDS.sampleResult.sampleStart(); //captures sampler's start time
    WDS.sampleResult.getLatency();
    machXMal(10, addCase);
    WDS.sampleResult.sampleEnd();
}

HAUPTFUNKTION();
