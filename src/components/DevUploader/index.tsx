import { pieApiClient } from "@/api/client";
import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";

const DevUploader = () => {
  const filesCount = useSignal<number>(0)
  const uploadedFilesCount = useSignal<number>(0)
  const uploadedFilesStatus = useSignal<number[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)


  async function uploadFile() {
    // setResult(undefined)
    uploadedFilesCount.value = 0

    if (fileInputRef.current && fileInputRef.current.files) {
      const selectedFiles = fileInputRef.current.files;

      for (const element of selectedFiles) {
        const formData = new FormData();
        formData.append("file", element);

        await pieApiClient.uploadMp3(formData).then(({ meta }) => {
          uploadedFilesCount.value++
          uploadedFilesStatus.value = [...uploadedFilesStatus.value, meta.status]
          // setResult(`${uploadedFilesCount}/${filesCount} files uploaded`)
        })

      }
    }
  }

  const onFilesSelect = (e: any) => {
    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length) {
      console.log('kek: ', e.currentTarget.files.length)

      filesCount.value = e.currentTarget.files.length
      uploadedFilesCount.value = 0
      uploadedFilesStatus.value = []
    }
  }

  const getFileName = (num: number) => {
    if (fileInputRef.current && fileInputRef.current.files) {
      return fileInputRef.current.files[num].name
    } else {
      return undefined
    }
  }

  const last = filesCount.value - uploadedFilesCount.value

  return (
    <div class='w-full overflow-y-scroll'>
      <form id="myForm" class='flex flex-col mb-[10%] gap-3 items-center'>
        <div class='w-full flex justify-between items-center'>
          <input ref={fileInputRef} onChange={onFilesSelect} class="w-[250px]" type="file" name="resources" id="fileInput" multiple />
          {/* {result && <span>{result}</span>} */}
          <button class="w-[250px] bg-cyan-500 hover:bg-cyan-600 transition-colors rounded-md h-[30px] cursor-pointer" type='button' onClick={uploadFile}>Upload</button>
        </div>

        <div class='mx-5 flex flex-wrap gap-1'>
          {filesCount.value > 0 && [...Array(filesCount).keys()].map((ignore, i, arr) => {
            const status = uploadedFilesStatus.value[i]
            return (
              <div data-tooltip={status >= 400 ? getFileName(i) : undefined}
                data-tooltip-position="bottom" class={`w-10 h-10 flex justify-center items-center text-center bg-opacity-80 ${arr.length - i <= last ? 'bg-slate-300' : status > 400 ? 'bg-red-300' : 'bg-green-300'}`}>{status >= 400 ? status : ''}</div>
            )
          })}
        </div>
      </form>
    </div>
  )
}

export default DevUploader
