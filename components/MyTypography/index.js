import { Typography } from 'antd';
import BraftEditor from 'braft-editor';

import 'braft-editor/dist/output.css';
import Style from './index.style';

const { Title } = Typography;

const MyTypography = (articleMap) => {
  const { title, content } = articleMap;
  const articleHtml = BraftEditor.createEditorState(content).toHTML();
  return (
    <Style>
      <Typography>
        <Title>{ title }</Title>
        <div className="braft-output-content" dangerouslySetInnerHTML={ { __html: articleHtml } }/>
      </Typography>
    </Style>
  );
};

export default MyTypography;