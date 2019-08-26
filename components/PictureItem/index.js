import Styled from './index.style';

const ArticleItem = ({ path, title, uuid, pictureScale, handleDeletePicture }) => {

  return (
    <Styled pictureScale={ pictureScale }>
      <div className='picture-wrapper' onClick={ () => handleDeletePicture(uuid)}>
        <div className='img-box global-loading'>
          <img alt={ title } src={ path } title={ title }/>
        </div>
      </div>
    </Styled>
  );
};


export default ArticleItem;