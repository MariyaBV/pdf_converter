$(function () {
    const $uploader = $("#uploader");
    const $fileInput = $("#fileInput");
    const $fileList = $("#fileList");
    const $pdfViewer = $("#pdf-viewer");

    // Кнопка выбора файлов
    $("#selectBtn").on("click", function () {
        $fileInput.click();
    });

    // Выбор файлов через input
    $fileInput.on("change", function () {
        handleFiles(this.files);
    });

    // Нужно отменять dragover/drop на всем документе
    $(document).on("dragover drop", function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    // Drag enter / leave / over
    $uploader.on("dragover", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $uploader.addClass("dragover");
    });

    $uploader.on("dragleave", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $uploader.removeClass("dragover");
    });

    // Drop
    $uploader.on("drop", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $uploader.removeClass("dragover");

        const files = e.originalEvent.dataTransfer.files;
        handleFiles(files);
    });

    // Обработка файлов
    function handleFiles(files) {
        $.each(files, function (_, file) {
            if (file.type === "application/pdf") {
                const li = $("<li></li>").text(file.name + " (" + (file.size / 1024).toFixed(1) + " KB)");
                $fileList.append(li);
            } else {
                alert("File " + file.name + " not is PDF!");
            }
        });
    };

    // Рендер PDF с помощью PDF.js
    function openPDF(file) {
        $pdfViewer.html(""); // очистка

        const reader = new FileReader();
        reader.onload = function () {
            const typedarray = new Uint8Array(this.result);

            pdfjsLib.getDocument(typedarray).promise.then(function (pdf) {
                console.log("PDF открыт, страниц:", pdf.numPages);

                // Рисуем все страницы
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    pdf.getPage(pageNum).then(function (page) {
                        const scale = 1.2;
                        const viewport = page.getViewport({ scale });

                        const canvas = document.createElement("canvas");
                        const context = canvas.getContext("2d");
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        $pdfViewer.append(canvas);

                        page.render({
                            canvasContext: context,
                            viewport: viewport
                        });
                    });
                }
            });
        };
        reader.readAsArrayBuffer(file);
    }
});