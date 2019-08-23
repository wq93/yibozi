import Styled from './index.style';

const ArticleItem = ({ path, title, uuid, handleDeletePicture }) => {

  return (
    <Styled>
      <div className='picture-wrapper' onClick={ () => handleDeletePicture(uuid)}>
        <div className='mark mark-left'/>
        <div className='mark mark-right'/>
        <img alt={ title } src={ path } title={ title }/>
      </div>
    </Styled>
  );
};


export default ArticleItem;