import * as React from 'react';
import produce from "immer";

type PathType = {
  [key: K]:string;
}

type Props = {

}

type State = {
  isLoading: boolean;
  isError: boolean;
  error: string;
  success: any;
} & WithConnectivityType;

type WithConnectivityType = {
  connect: any;
}

const withConnectivity = (result: any, defaultSuccessResult: any)  => (path:string) => (WrappedComponent) => {
  class Connectivity extends React.Component<Props, State> {

    constructor(props:Props) {
      super(props);
      this.state = {
        isLoading: false,
        isError: false,
        error: "",
        success:defaultSuccessResult
      }
    }

    _connect = (input:any, errorMessage?:string, method='POST') => {
      this._startConnection();

      if (method.toUpperCase().toString() !== "GET") {
        fetch(path, {
          method: method,
          body: JSON.stringify(input),
          mode: "cors",
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(resp => resp.json())
          .then(data => {this._checkForError(data); return data})
          .then(data => this._handleReturnData(data, errorMessage))
          .catch(error => this._handleException(error));

       }
       else {
         let newRequestPath = this._generateRestPath(input);
         newRequestPath += this._serialize(input);
         fetch(newRequestPath, {
           method: 'GET',
           mode: 'cors'
         }).then(resp => resp.json())
           .then(data => {this._checkForError(data); return data})
           .then(data => this._handleReturnData(data, errorMessage))
           .catch(error => this._handleException(error));
       }

    }

    _generateRestPath = (paramInfo:IPath) => {
      let _path = path;
      if(paramInfo) {
        //Todo string replacement, i.e. /"{AUTHENTICATE}"/"{ReplaceKey}"
        for (const key in paramInfo) {
          const matchRegex = new RegExp(`{${key}}`, "g");
          _path = _path.replace(matchRegex, paramInfo[key]);
        }
      }
      return _path;
    }

    _serialize = (obj: object) => {

      if(!obj || typeof obj === "undefined") {
        return "";
      }

      var str = [];
      for (var p in obj) {
        if ((obj).hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent((obj)[p]));
        }
      }
      return "?" + str.join("&");

    }

    _checkForError = (data: any) => {
      if(!data || typeof data === "undefined") {
        throw Error("No valid data");
      }

      if(data.errors) {
        const {code, message} = data.errors;
        throw Error(`Code: ${code}, Message: ${message}`);
      }
    }

    _getErrorMessage = (actualError: string, errorMessage?: string) => {
      if(errorMessage && errorMessage !== "") {
        return errorMessage;
      }
      return actualError;
    }

    _handleReturnData = (successfulData: any, errorMessage?: string) => {
      if(!successfulData || successfulData === undefined) {
        throw Error("No valid data");
      } else {
        let nextState;
        if (successfulData.Error) {
          nextState = produce(this.state, draft => {
            draft.isError = true;
            draft.isLoading = false;
            draft.error = this._getErrorMessage(successfulData.error, errorMessage);
            console.error(successfulData.error, "connectivity error");
          });
        }
        else {
          nextState = produce(this.state, draft => {
            draft.isError = false;
            draft.isLoading = false;
            draft.success = successfulData;
          });
        }

        this.setState(nextState);
      }
    }

    _handleException = (error:Error) => {
      let nextState = produce(this.state, draft => {
        draft.isLoading = false;
        draft.isError = true;
        draft.error = (error).message;
      });
      this.setState(nextState);
    }

    _startConnection = () => {
      let nextState = produce(this.state, draft => {
        draft.isLoading = true;
      });
      this.setState(nextState);
    }

    render() {
      const {forwardedRef, ...otherProps} = this.props;
      const componentProps = otherProps;
      const responseWithConnection = {
        ...this.state,
        connect: this._connect
      }
      const response = result(responseWithConnection);

      return (
        <WrappedComponent
          {...componentProps}
          {...response}
          ref={forwardedRef}/>
        ) //spreading
    }
  }

  const RefForwardingFactory = (props: Props, ref: any) => {return <Connectivity {...props} forwardedRef={ref}/>};

  return React.forwardRef(RefForwardingFactory);

}

export default withConnectivity;
