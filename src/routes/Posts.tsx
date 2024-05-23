import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../main';
import { ArrowCircleUp } from '@mui/icons-material';
import './Posts.styles.scss';

export const Posts = () => {
	const [image, setImage] = useState<File | null>(null);
	const [gallery, setGallery] = useState<string[] | never[]>([]);

	const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => e.target.files && setImage(e.target.files[0]);

	const handleUploadImage = async (e: FormEvent) => {
		e.preventDefault();
		if (!image) return;

		try {
			const imageRef = ref(storage, `images/${image.name}`);
			const snapshot = await uploadBytes(imageRef, image);
			const url = await getDownloadURL(snapshot.ref);
			setGallery(prevState => [url, ...prevState]);
		} catch (error) {
			console.log(error);
		}
		setImage(null);
	};

	useEffect(() => {
		(async () => {
			const imagesListRef = await listAll(ref(storage, 'images'));
			const imagesList = await imagesListRef.items.reduce(async (accumulator, currentImageRef) => {
				const urlList: string[] = await accumulator;
				const url = await getDownloadURL(currentImageRef);
				urlList.push(url);
				return urlList;
			}, Promise.resolve<string[] | never[]>([]));
			setGallery(prevState => [...imagesList, ...prevState]);
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
					? gallery.map(imageUrl => <img src={imageUrl} alt='landscape' key={imageUrl.substring(imageUrl.length - 10)} />)
					: null}
			</div>
		</div>
	);
};
