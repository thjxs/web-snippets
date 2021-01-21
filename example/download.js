/**
 * [downloadFn description]
 * @param  {string | ArrayBuffer | ArrayBufferView | Blob} content
 * @param  {string} filename
 * @param  {string} mime
 * @param  {string} bom
 * @return {void}
 */
var downloadFn = function (content, filename, mime, bom) {
  var blobData = typeof bom !== 'undefined' ? [bom, content] : [content];
  var blob = new Blob(blobData, { type: mime || 'application/octet-stream' });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE 10+
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var blobURL = window.URL.createObjectURL(blob);
    var aLink = document.createElement('a');
    aLink.style.display = 'none';
    aLink.href = blobURL;
    aLink.setAttribute('download', filename);

    // Safari
    if (typeof aLink.download === 'undefined') {
      aLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
    window.URL.revokeObjectURL(blobURL);
  }
};

/**
 * 将数组导出 csv 文件
 * @param  {string} head
 * @param  {array} rows
 * @param  {string} filename
 * @param  {array}  hidden
 * @return {null}
 */
var exportExcel = function (head, rows, filename, hidden = []) {
  const rowsContent = rows
    .map((item) => {
      let str = '';
      for (prop in item) {
        if (!item.hasOwnProperty(prop)) continue;
        if (hidden.indexOf(prop) !== -1) continue;
        str += `"${item[prop]}",`;
      }
      return str;
    })
    .join('\n');
  const content = '\ufeff' + head + '\n' + rowsContent;
  downloadFn(content, filename);
};
