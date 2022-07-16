# UI Library

This library aims to provide a pragmatic solution for standard expressive layouts creation on webpages, through CustomElements API on browsers.

## Vision

> Frontend computation is for representation of the data to be presented.
> It does not need to be computed at the server end.
> Ever.

Build a library that needs to be transferred over a single time.
Provides the exact standard rendering of components as required to create a quick smooth frontend.
Enable low code capabilities through standardization of elements as required.

## Compatibility

Compatibility and ease of use is important to us. The library is usable beside any and all other popular UI libraries.

## Where in MVC or MVVM does this fit?

Caters to the 'view' aspect only. A better abstraction of the HTML elements will be provided at first release. However, it is recommended to remove server dependence for UI updation. Let designers and developers do their respective jobs. Let designers take care of user conversion, let developers handle optimization of functionalities.

## Mobile first?

No prioritization of viewports has been done.

## Future Considerations

### Say you still want to control frontend via the server

Provide hooks such as `$ui_callback` in order to receive from the server what needs to be updated and the content in it.
