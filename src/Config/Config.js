//----------HOW IT WORKS-------------------------------------------------------------------------------------------------------------------------------
// 1. ID - the query (www.theconfigurator.com/?id=) required in order to load the config, defaults to the first item in this list if no query in the url
// 2. LANGUAGE - the starting language (en, nl, de, no)
// 3. TITLE - the title of the document (normally "Fusion Configurator)
// 4. PRICELIST - the csv filename for the pricelist
// 5. CURRENCY - the currency (GBP, EURO, KR)
// 6. LOGO1 - the filename for the top left logo (normally "ViridianLogo.svg")
// 7. LOGO2 - the filename for the logo next to Logo1, set this to "null" if there is no need for one
// 8. LOGO3 - the filename for the right hand side logo (normally "ClearlineLogo.svg")
//-----------------------------------------------------------------------------------------------------------------------------------------------------



const Config = [
    {
        Id: "ViridianEN",
        Language: "en",
        Title: "Fusion Configurator",
        PriceList: "ViridianUKPrices.csv",
        Currency:"GBP",
        Logo1: "ViridianLogo.svg",
        Logo2: null,
        Logo3: "ClearlineLogo.svg"
        
    },
    {
        Id: "ViridianNL",
        Language: "nl",
        Title: "Clearline Fusion Configurator",
        PriceList: "ViridianNLPrices.csv",
        Currency: "EURO",
        Logo1: "ViridianLogo.svg",
        Logo2: null,
        Logo3: "ClearlineLogo.svg"
    },
    {
        Id: "ViridianNO",
        Language: "no",
        Title: "Fusion Konfigurator",
        PriceList: "ViridianNOPrices.csv",
        Currency: "KR",
        Logo1: "ViridianLogo.svg",
        Logo2: null,
        Logo3: "ClearlineLogo.svg"
    },
    {
        Id: "ViridianDE",
        Language: "de",
        Title: "Clearline-Fusion-Konfigurator",
        PriceList: "ViridianDEPrices.csv",
        Currency: "EURO",
        Logo1: "ViridianLogo.svg",
        Logo2: null,
        Logo3: "ClearlineLogo.svg"
    },
    {
        Id: "BobbyExample",
        Language: "de",
        Title: "Bobby's Amazing Webapp",
        PriceList: "BobbyPrices.csv",
        Currency: "KR",
        Logo1: "CM.png",
        Logo2: "ram.png",
        Logo3: "Clearline.png"
    },
]

export default Config