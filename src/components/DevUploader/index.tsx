import { api } from "@/api";

const DevUploader = () => {

    function _(el: string) {
        return document.getElementById(el)!;
    }

    function uploadFile() {
        _("progressBar").style.display = "block";
        // _("progressBar").style.visibility = "visible";

        const fileInput = _("fileInput") as any;
        const formData = new FormData();

        const selectedFiles = fileInput.files;
        for (const element of selectedFiles) {
          formData.append("file", element);
        }

        console.log("data: ", formData);

        const xhr = new XMLHttpRequest();
        console.log('upload: ', api.forUpload())
        xhr.open("POST", api.forUpload(), true);
        xhr.upload.addEventListener("progress", progressHandler, false);
        xhr.addEventListener("load", completeHandler, false);
        xhr.addEventListener("error", errorHandler, false);
        xhr.addEventListener("abort", abortHandler, false);
        xhr.onload = function () {
          _("response").innerText = xhr.responseText;
        };
        xhr.send(formData);
      }

      function progressHandler(event: any) {
        _("loaded_n_total").innerHTML =
          "Uploaded " + event.loaded + " bytes of " + event.total;
        var percent = (event.loaded / event.total) * 100;
        (_("progressBar") as any).value = Math.round(percent);
        _("status").innerHTML =
          Math.round(percent) + "% uploaded... please wait";
      }

      function completeHandler(event: any) {
        _("loaded_n_total").innerHTML =
          "Uploaded " + event.loaded + " bytes of " + event.total;
        var percent = (event.loaded / event.total) * 100;
        (_("progressBar") as any).value = Math.round(percent);
        _("status").innerHTML = Math.round(percent) + "% uploaded";
      }

      function errorHandler() {
        _("status").innerHTML = "Upload Failed";
      }

      function abortHandler() {
        _("status").innerHTML = "Upload Aborted";
      }

    return (
        <div class='w-full'>
            <form id="myForm" class='flex flex-col mt-[30%] gap-3 items-center'>
                <input class="w-[250px] bg-green-600" type="file" name="resources" id="fileInput" multiple />
                <input class="w-[250px] bg-green-600 h-[30px] cursor-pointer" type="button" value="Upload" onClick={uploadFile} />
                <br />
                <progress
                    id="progressBar"
                    value="0"
                    max="100"
                    style="width: 300px; display: none;"
                ></progress>
                <h4 id="status"></h4>
                <br />
                <p id="loaded_n_total"></p>
                <br />
                <p id="response"></p>
            </form>
        </div>
    )
}

export default DevUploader