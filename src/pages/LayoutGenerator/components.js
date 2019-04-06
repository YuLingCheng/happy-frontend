import styled from 'styled-components';
export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const PreviewContainer = styled.div`
  flex: 1;
  background-image: url(${props => props.mockupPreview});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: lightGrey;
`
export const ToolContainer = styled.div`
  flex: 0 0 35%;
  background: white;
  overflow: auto;

  .ant-card-head {
    min-height: 40px;
    padding: 0 15px;
  }
  .ant-card-head-title {
    padding: 15px 0;
  }
  .ant-card-type-inner .ant-card-head {
    min-height: 20px;
  }
  .ant-card-type-inner .ant-card-head-title {
    padding: 5px;
    white-space: normal;
    line-height: 15px;
  }
  .ant-card-type-inner .ant-card-head {
    padding: 0 10px;
  }
  .ant-card-body {
    padding: 10px;
  }
  .ant-input-group-addon {
    background-color: lightGrey;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 5px 45px;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    padding-top: 0;
  }
  .ant-divider-horizontal.ant-divider-with-text-left {
    font-size: 14px;
    margin-bottom: 10px;
  }
`

export const Helper = styled.div`
  width: 65%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
`

Helper.Content = styled.div`
  width: 40vw;
  margin: 60px auto;
  border: 1px dashed #145678;
  background-color: rgb(20, 86, 120, 0.05);
  color: #145678;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: small;

  h2 {
    color: #145678;
    font-size: medium;
  }

  .dropzone {
    padding: 20px;
    outline: none;
  }
`

export const ExampleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #145678;
  height: 45px;
  padding: 0 10px;
  color: #145678;
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: bold;
`

export const ExampleFooter = styled.div`
  border-top: 1px solid #145678;
  padding: 20px;
  text-align: center;
  color: #145678;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: x-small;
`
