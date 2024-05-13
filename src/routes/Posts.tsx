import './Posts.styles.scss';
import { ArrowCircleUp } from '@mui/icons-material';

export const Posts = () => {
	return (
		<div className='posts'>
			<div className='posts__form form'>
				<h2>Send something cool</h2>
				<label htmlFor='file' className='form__label'>
					<ArrowCircleUp /> Upload photo
				</label>
				<input type='file' name='file' id='file' className='form__input' />
				<button className='form__button' type='submit' disabled>
					Submit
				</button>
			</div>
			<div className='content'>
				<img src='https://picsum.photos/300/200' alt='' />
				<img src='https://picsum.photos/300/200' alt='' />
				<img src='https://picsum.photos/300/200' alt='' />
				<img src='https://picsum.photos/300/200' alt='' />
			</div>
		</div>
	);
};
