define([
    "classes/Extension"
], function(Extension) {

    var legisdown = new Extension("legisdown", "Legisdown");
    var eventMgr = undefined;
    legisdown.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    legisdown.onPagedownConfigure = function(editor) {
        var converter = editor.getConverter();
        converter.hooks.chain("preConversion", function(text) {
	    var tmpText = text;
            tmpText = text.replace(/^\s*(#+)(.*)\{: (\w+='\w+')+\s*\}\s*$/gm, function(match, level, title, attribute) {
                var levelNum = level.length;
                var title = title.trim();
                var attributeInfo = attribute.split('='); 
                var returnString = "<h" + levelNum + " data-" + attributeInfo[0] + "=" + attributeInfo[1] + ">" + title + "</h" + levelNum + ">";

                console.log(returnString);
                return returnString;
            });
            return tmpText;
        });
    };

    return legisdown;
});