import Styled from './index.style';

const ArticleItem = ({ path, title, uuid, handleDeletePicture }) => {

  return (
    <Styled>
      <div className='picture-wrapper' onClick={ () => handleDeletePicture(uuid)}>
        <img alt={ title } src={ path } title={ title }/>
      </div>
    </Styled>
  );
};


export default ArticleItem;