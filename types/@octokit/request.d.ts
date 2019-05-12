export = index;
declare function index(route: any, options: any): any;
declare namespace index {
  function defaults(p0: any): any;
  function endpoint(p0: any, p1: any): any;
  namespace endpoint {
    const DEFAULTS: {
      baseUrl: string;
      headers: {
        accept: string;
        "user-agent": string;
      };
      mediaType: {
        format: string;
        previews: any[];
      };
      method: string;
    };
    function defaults(p0: any): any;
    function merge(p0: any, p1: any): any;
    function parse(options: any): any;
  }
}
