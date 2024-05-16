import { useEffect, useState } from 'react';
import { ArrowCircleUp } from '@mui/icons-material';
import './Posts.styles.scss';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../main';

export const Posts = () => {
	const [image, setImage] = useState<any>(null);
	const [gallery, setGallery] = useState<any>([]);

	const handleSelectImage = (e: any) => setImage(e.target.files[0]);

	const handleUploadImage = async (e: any) => {
		e.preventDefault();
		if (!image) return;

		try {
			const imageRef = ref(storage, `images/${image.name}`);
			const snapshot = await uploadBytes(imageRef, image);
			const url = await getDownloadURL(snapshot.ref);
			setGallery((prevState: any) => [url, ...prevState]);
			console.log('Upload successful!');
		} catch (error) {
			console.log(error);
		}
		setImage(null);
	};

	useEffect(() => {
		(async () => {
			const imagesListRef = await listAll(ref(storage, 'images/'));
			const imagesList = await imagesListRef.items.reduce(async (accumulator: any, currentImage: any) => {
				const urlList = await accumulator;
				const url = await getDownloadURL(currentImage);
				urlList.push(url);
				return urlList;
			}, Promise.resolve([]));
			setGallery((prevImages: any) => [...prevImages, ...imagesList]);
		})();
	}, []);

	return (
		<div className='posts'>
			<form className='posts__form form' onSubmit={handleUploadImage}>
				<h2>Send something cool</h2>
				<label htmlFor='file' className='form__label'>
					<ArrowCircleUp /> Upload photo
				</label>
				<input type='file' name='file' id='file' className='form__input' onChange={handleSelectImage} />
				<button className='form__button' type='submit' disabled={!image}>
					Submit
				</button>
			</form>
			<div className='content'>
				{gallery.length
					? gallery.map((imageSrc: any) => <img key={imageSrc.substring(imageSrc.length - 10)} src={imageSrc} alt='landscape' />)
					: null}
			</div>
		</div>
	);
};
