import React, { useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';

import { useDispatch } from 'react-redux';
// import { setLoading } from '../../redux/ducks/loadingDux';
// import { uploadImg2Cloud } from '../../configs/API/admin/media';
var BaseImageFormat = Quill.import('formats/image');
const ImageFormatAttributesList = ['alt', 'height', 'width', 'style'];

class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(ImageFormat, true);

Quill.register('modules/imageResize', ImageResize);

const TextEditor = (props) => {
  const dispatch = useDispatch();
  const quillRef = useRef(null);
  // useEffect(() => {
  //   const quillInstance = quillRef.current.getEditor();

  //   if (quillInstance) {
  //     quillInstance.getModule('toolbar').addHandler('image', () => {
  //       const input = document.createElement('input');
  //       input.setAttribute('type', 'file');
  //       input.setAttribute('accept', 'image/jpeg, image/png, image/webp'); // Specify the accepted formats here
  //       input.click();

  //       input.onchange = async () => {
  //         const file = input.files[0];

  //         if (file) {
  //           const formData = new FormData();
  //           formData.append('image', file);

  //           try {
  //             dispatch(setLoading(true));
  //             const response = await uploadImg2Cloud(formData);
  //             const range = quillInstance.getSelection(true);
  //             console.log(response.data.url);
  //             quillInstance.insertEmbed(range.index, 'image', response.data.url);
  //             quillInstance.setSelection(range.index + 1);
  //           } catch (error) {
  //             alert(error.message);
  //           } finally {
  //             dispatch(setLoading(false));
  //           }
  //         }
  //       };
  //     });
  //   }
  // }, []);

  return (
    <ReactQuill
      {...props}
      ref={quillRef}
      theme="snow"
      modules={TextEditor.modules}
      formats={TextEditor.formats}
      bounds="#root"
    />
  );
};

TextEditor.modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'],

    ['clean'] // remove formatting button
  ],
  clipboard: {
    matchVisual: true
  },
  imageResize: {
    // parchment: Quill.import('parchment'),
    // modules: ['Toolbar']
  }
};

TextEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'code-block',
  'script',
  'background',
  'image',
  'width',
  'video'
];

export default TextEditor;
