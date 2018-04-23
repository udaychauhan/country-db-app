export interface UrlFilter {
    filterValue:string;
    filterUrl();// to be called in ngOnInit()
}