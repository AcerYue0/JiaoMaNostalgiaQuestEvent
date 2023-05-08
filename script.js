// 當按鈕被點擊時觸發的函數
function handleClick(buttonId) {
    // 根據按鈕的id確定資料表名稱
    var tableName = buttonId.toUpperCase();

    // 根據資料表名稱查找資料表
    findTable(tableName)
        .then(function (table) {
            if (table) {
                // 獲取對應儲存格的內容
                var cellContent = getCellContent(table, tableName);

                // 更新 task-details 區域的內容
                var taskDetails = document.querySelector(".task-details");
                taskDetails.textContent = cellContent;
            }
        });
}

//顯示試算表內容
function showCellContent(button) {
    var group = button.closest('section').id; // 獲取所屬的section元素的id
    var cellName = 'B' + getCellPosition(button.innerText);
    var completeCellName = 'C' + getCellPosition(button.innerText);
    var taskTitle = document.getElementById('task-title');
    var cellContentFrame = document.getElementById('cellContentFrame');
    var taskComplete = document.getElementById('task-complete');
    var completeFrame = document.getElementById('completeFrame');
    taskTitle.innerText = "任務" + button.innerText + "內容：";
    cellContentFrame.src = getGoogleSheetsLink(cellName, group);
    taskComplete.innerText = "達成條件：";
    completeFrame.src = getGoogleSheetsLink(completeCellName, group);
}

//試算表src設定
function getGoogleSheetsLink(cellName, group) {
    var spreadsheetId = '2PACX-1vQe-uilBoqrG_58UzJ2lwm_GfEVMwHH_YwmoBfiNUoSDl2bQoAN9UfS1tqIaKJsgQvg0M_KswCCSxWc';
    var sheetId = getSheetIdByGroup(group);
    var range = cellName;

    return "https://docs.google.com/spreadsheets/d/e/" + spreadsheetId + "/pubhtml/sheet?headers=false&gid=" + sheetId + "&range=" + range;
}

//資料表id設定
function getSheetIdByGroup(group) {
    var sheetId;
    switch (group) {
        case 'newbie':
            sheetId = '584871194';
            break;
        case 'regular':
            sheetId = '271979307';
            break;
        case 'expert':
            sheetId = '102448095';
            break;
        case 'master':
            sheetId = '709743802';
            break;
    }
    return sheetId;
}

//儲存格設定
function getCellPosition(text) {
    return text.charAt(0).toUpperCase().charCodeAt(0) - 64
}