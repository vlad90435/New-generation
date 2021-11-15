!( function ( e, t ) {
	"function" == typeof define && define.amd ?
		define( t ) :
		"object" == typeof exports ?
		( module.exports = t() ) :
		( e.ScrollMagic = t() );
} )( this, function () {
	"use strict";
	var e = function () {};
	( e.version = "2.0.5" ), window.addEventListener( "mousewheel", function () {} );
	var t = "data-scrollmagic-pin-spacer";
	e.Controller = function ( r ) {
		var o,
			s,
			a = "ScrollMagic.Controller",
			l = "FORWARD",
			c = "REVERSE",
			u = "PAUSED",
			f = n.defaults,
			d = this,
			h = i.extend( {}, f, r ),
			g = [],
			p = !1,
			v = 0,
			m = u,
			w = !0,
			y = 0,
			S = !0,
			b = function () {
				for ( var e in h ) f.hasOwnProperty( e ) || delete h[ e ];
				if ( ( ( h.container = i.get.elements( h.container )[ 0 ] ), !h.container ) )
					throw a + " init failed.";
				( w =
					h.container === window ||
					h.container === document.body ||
					!document.body.contains( h.container ) ),
				w && ( h.container = window ),
					( y = z() ),
					h.container.addEventListener( "resize", T ),
					h.container.addEventListener( "scroll", T ),
					( h.refreshInterval =
						parseInt( h.refreshInterval ) || f.refreshInterval ),
					E();
			},
			E = function () {
				h.refreshInterval > 0 && ( s = window.setTimeout( A, h.refreshInterval ) );
			},
			x = function () {
				return h.vertical ?
					i.get.scrollTop( h.container ) :
					i.get.scrollLeft( h.container );
			},
			z = function () {
				return h.vertical ?
					i.get.height( h.container ) :
					i.get.width( h.container );
			},
			C = ( this._setScrollPos = function ( e ) {
				h.vertical ?
					w ?
					window.scrollTo( i.get.scrollLeft(), e ) :
					( h.container.scrollTop = e ) :
					w ?
					window.scrollTo( e, i.get.scrollTop() ) :
					( h.container.scrollLeft = e );
			} ),
			F = function () {
				if ( S && p ) {
					var e = i.type.Array( p ) ? p : g.slice( 0 );
					p = !1;
					var t = v;
					v = d.scrollPos();
					var n = v - t;
					0 !== n && ( m = n > 0 ? l : c ),
						m === c && e.reverse(),
						e.forEach( function ( e ) {
							e.update( !0 );
						} );
				}
			},
			L = function () {
				o = i.rAF( F );
			},
			T = function ( e ) {
				"resize" == e.type && ( ( y = z() ), ( m = u ) ), p !== !0 && ( ( p = !0 ), L() );
			},
			A = function () {
				if ( !w && y != z() ) {
					var e;
					try {
						e = new Event( "resize", {
							bubbles: !1,
							cancelable: !1,
						} );
					} catch ( t ) {
						( e = document.createEvent( "Event" ) ), e.initEvent( "resize", !1, !1 );
					}
					h.container.dispatchEvent( e );
				}
				g.forEach( function ( e ) {
						e.refresh();
					} ),
					E();
			};
		this._options = h;
		var O = function ( e ) {
			if ( e.length <= 1 ) return e;
			var t = e.slice( 0 );
			return (
				t.sort( function ( e, t ) {
					return e.scrollOffset() > t.scrollOffset() ? 1 : -1;
				} ),
				t
			);
		};
		return (
			( this.addScene = function ( t ) {
				if ( i.type.Array( t ) )
					t.forEach( function ( e ) {
						d.addScene( e );
					} );
				else if ( t instanceof e.Scene )
					if ( t.controller() !== d ) t.addTo( d );
					else if ( g.indexOf( t ) < 0 ) {
					g.push( t ),
						( g = O( g ) ),
						t.on( "shift.controller_sort", function () {
							g = O( g );
						} );
					for ( var n in h.globalSceneOptions )
						t[ n ] && t[ n ].call( t, h.globalSceneOptions[ n ] );
				}
				return d;
			} ),
			( this.removeScene = function ( e ) {
				if ( i.type.Array( e ) )
					e.forEach( function ( e ) {
						d.removeScene( e );
					} );
				else {
					var t = g.indexOf( e );
					t > -1 &&
						( e.off( "shift.controller_sort" ), g.splice( t, 1 ), e.remove() );
				}
				return d;
			} ),
			( this.updateScene = function ( t, n ) {
				return (
					i.type.Array( t ) ?
					t.forEach( function ( e ) {
						d.updateScene( e, n );
					} ) :
					n ?
					t.update( !0 ) :
					p !== !0 &&
					t instanceof e.Scene &&
					( ( p = p || [] ), -1 == p.indexOf( t ) && p.push( t ), ( p = O( p ) ), L() ),
					d
				);
			} ),
			( this.update = function ( e ) {
				return (
					T( {
						type: "resize",
					} ),
					e && F(),
					d
				);
			} ),
			( this.scrollTo = function ( n, r ) {
				if ( i.type.Number( n ) ) C.call( h.container, n, r );
				else if ( n instanceof e.Scene )
					n.controller() === d && d.scrollTo( n.scrollOffset(), r );
				else if ( i.type.Function( n ) ) C = n;
				else {
					var o = i.get.elements( n )[ 0 ];
					if ( o ) {
						for ( ; o.parentNode.hasAttribute( t ); ) o = o.parentNode;
						var s = h.vertical ? "top" : "left",
							a = i.get.offset( h.container ),
							l = i.get.offset( o );
						w || ( a[ s ] -= d.scrollPos() ), d.scrollTo( l[ s ] - a[ s ], r );
					}
				}
				return d;
			} ),
			( this.scrollPos = function ( e ) {
				return arguments.length ?
					( i.type.Function( e ) && ( x = e ), d ) :
					x.call( d );
			} ),
			( this.info = function ( e ) {
				var t = {
					size: y,
					vertical: h.vertical,
					scrollPos: v,
					scrollDirection: m,
					container: h.container,
					isDocument: w,
				};
				return arguments.length ? ( void 0 !== t[ e ] ? t[ e ] : void 0 ) : t;
			} ),
			( this.loglevel = function () {
				return d;
			} ),
			( this.enabled = function ( e ) {
				return arguments.length ?
					( S != e && ( ( S = !!e ), d.updateScene( g, !0 ) ), d ) :
					S;
			} ),
			( this.destroy = function ( e ) {
				window.clearTimeout( s );
				for ( var t = g.length; t--; ) g[ t ].destroy( e );
				return (
					h.container.removeEventListener( "resize", T ),
					h.container.removeEventListener( "scroll", T ),
					i.cAF( o ),
					null
				);
			} ),
			b(),
			d
		);
	};
	var n = {
		defaults: {
			container: window,
			vertical: !0,
			globalSceneOptions: {},
			loglevel: 2,
			refreshInterval: 100,
		},
	};
	( e.Controller.addOption = function ( e, t ) {
		n.defaults[ e ] = t;
	} ),
	( e.Controller.extend = function ( t ) {
		var n = this;
		( e.Controller = function () {
			return (
				n.apply( this, arguments ),
				( this.$super = i.extend( {}, this ) ),
				t.apply( this, arguments ) || this
			);
		} ),
		i.extend( e.Controller, n ),
			( e.Controller.prototype = n.prototype ),
			( e.Controller.prototype.constructor = e.Controller );
	} ),
	( e.Scene = function ( n ) {
		var o,
			s,
			a = "BEFORE",
			l = "DURING",
			c = "AFTER",
			u = r.defaults,
			f = this,
			d = i.extend( {}, u, n ),
			h = a,
			g = 0,
			p = {
				start: 0,
				end: 0,
			},
			v = 0,
			m = !0,
			w = function () {
				for ( var e in d ) u.hasOwnProperty( e ) || delete d[ e ];
				for ( var t in u ) L( t );
				C();
			},
			y = {};
		( this.on = function ( e, t ) {
			return (
				i.type.Function( t ) &&
				( ( e = e.trim().split( " " ) ),
					e.forEach( function ( e ) {
						var n = e.split( "." ),
							r = n[ 0 ],
							i = n[ 1 ];
						"*" != r &&
							( y[ r ] || ( y[ r ] = [] ),
								y[ r ].push( {
									namespace: i || "",
									callback: t,
								} ) );
					} ) ),
				f
			);
		} ),
		( this.off = function ( e, t ) {
			return e ?
				( ( e = e.trim().split( " " ) ),
					e.forEach( function ( e ) {
						var n = e.split( "." ),
							r = n[ 0 ],
							i = n[ 1 ] || "",
							o = "*" === r ? Object.keys( y ) : [ r ];
						o.forEach( function ( e ) {
							for ( var n = y[ e ] || [], r = n.length; r--; ) {
								var o = n[ r ];
								!o ||
									( i !== o.namespace && "*" !== i ) ||
									( t && t != o.callback ) ||
									n.splice( r, 1 );
							}
							n.length || delete y[ e ];
						} );
					} ),
					f ) :
				f;
		} ),
		( this.trigger = function ( t, n ) {
			if ( t ) {
				var r = t.trim().split( "." ),
					i = r[ 0 ],
					o = r[ 1 ],
					s = y[ i ];
				s &&
					s.forEach( function ( t ) {
						( o && o !== t.namespace ) ||
						t.callback.call( f, new e.Event( i, t.namespace, f, n ) );
					} );
			}
			return f;
		} ),
		f
			.on( "change.internal", function ( e ) {
				"loglevel" !== e.what &&
					"tweenChanges" !== e.what &&
					( "triggerElement" === e.what ?
						E() :
						"reverse" === e.what && f.update() );
			} )
			.on( "shift.internal", function () {
				S(), f.update();
			} ),
			( this.addTo = function ( t ) {
				return (
					t instanceof e.Controller &&
					s != t &&
					( s && s.removeScene( f ),
						( s = t ),
						C(),
						b( !0 ),
						E( !0 ),
						S(),
						s.info( "container" ).addEventListener( "resize", x ),
						t.addScene( f ),
						f.trigger( "add", {
							controller: s,
						} ),
						f.update() ),
					f
				);
			} ),
			( this.enabled = function ( e ) {
				return arguments.length ?
					( m != e && ( ( m = !!e ), f.update( !0 ) ), f ) :
					m;
			} ),
			( this.remove = function () {
				if ( s ) {
					s.info( "container" ).removeEventListener( "resize", x );
					var e = s;
					( s = void 0 ), e.removeScene( f ), f.trigger( "remove" );
				}
				return f;
			} ),
			( this.destroy = function ( e ) {
				return (
					f.trigger( "destroy", {
						reset: e,
					} ),
					f.remove(),
					f.off( "*.*" ),
					null
				);
			} ),
			( this.update = function ( e ) {
				if ( s )
					if ( e )
						if ( s.enabled() && m ) {
							var t,
								n = s.info( "scrollPos" );
							( t =
								d.duration > 0 ?
								( n - p.start ) / ( p.end - p.start ) :
								n >= p.start ?
								1 :
								0 ),
							f.trigger( "update", {
									startPos: p.start,
									endPos: p.end,
									scrollPos: n,
								} ),
								f.progress( t );
						} else T && h === l && O( !0 );
				else s.updateScene( f, !1 );
				return f;
			} ),
			( this.refresh = function () {
				return b(), E(), f;
			} ),
			( this.progress = function ( e ) {
				if ( arguments.length ) {
					var t = !1,
						n = h,
						r = s ? s.info( "scrollDirection" ) : "PAUSED",
						i = d.reverse || e >= g;
					if (
						( 0 === d.duration ?
							( ( t = g != e ),
								( g = 1 > e && i ? 0 : 1 ),
								( h = 0 === g ? a : l ) ) :
							0 > e && h !== a && i ?
							( ( g = 0 ), ( h = a ), ( t = !0 ) ) :
							e >= 0 && 1 > e && i ?
							( ( g = e ), ( h = l ), ( t = !0 ) ) :
							e >= 1 && h !== c ?
							( ( g = 1 ), ( h = c ), ( t = !0 ) ) :
							h !== l || i || O(),
							t )
					) {
						var o = {
								progress: g,
								state: h,
								scrollDirection: r,
							},
							u = h != n,
							p = function ( e ) {
								f.trigger( e, o );
							};
						u && n !== l && ( p( "enter" ), p( n === a ? "start" : "end" ) ),
							p( "progress" ),
							u && h !== l && ( p( h === a ? "start" : "end" ), p( "leave" ) );
					}
					return f;
				}
				return g;
			} );
		var S = function () {
				( p = {
					start: v + d.offset,
				} ),
				s &&
					d.triggerElement &&
					( p.start -= s.info( "size" ) * d.triggerHook ),
					( p.end = p.start + d.duration );
			},
			b = function ( e ) {
				if ( o ) {
					var t = "duration";
					F( t, o.call( f ) ) &&
						!e &&
						( f.trigger( "change", {
								what: t,
								newval: d[ t ],
							} ),
							f.trigger( "shift", {
								reason: t,
							} ) );
				}
			},
			E = function ( e ) {
				var n = 0,
					r = d.triggerElement;
				if ( s && r ) {
					for (
						var o = s.info(),
							a = i.get.offset( o.container ),
							l = o.vertical ? "top" : "left"; r.parentNode.hasAttribute( t );

					)
						r = r.parentNode;
					var c = i.get.offset( r );
					o.isDocument || ( a[ l ] -= s.scrollPos() ), ( n = c[ l ] - a[ l ] );
				}
				var u = n != v;
				( v = n ),
				u &&
					!e &&
					f.trigger( "shift", {
						reason: "triggerElementPosition",
					} );
			},
			x = function () {
				d.triggerHook > 0 &&
					f.trigger( "shift", {
						reason: "containerResize",
					} );
			},
			z = i.extend( r.validate, {
				duration: function ( e ) {
					if ( i.type.String( e ) && e.match( /^(\.|\d)*\d+%$/ ) ) {
						var t = parseFloat( e ) / 100;
						e = function () {
							return s ? s.info( "size" ) * t : 0;
						};
					}
					if ( i.type.Function( e ) ) {
						o = e;
						try {
							e = parseFloat( o() );
						} catch ( t ) {
							e = -1;
						}
					}
					if ( ( ( e = parseFloat( e ) ), !i.type.Number( e ) || 0 > e ) )
						throw o ? ( ( o = void 0 ), 0 ) : 0;
					return e;
				},
			} ),
			C = function ( e ) {
				( e = arguments.length ? [ e ] : Object.keys( z ) ),
				e.forEach( function ( e ) {
					var t;
					if ( z[ e ] )
						try {
							t = z[ e ]( d[ e ] );
						} catch ( n ) {
							t = u[ e ];
						} finally {
							d[ e ] = t;
						}
				} );
			},
			F = function ( e, t ) {
				var n = !1,
					r = d[ e ];
				return d[ e ] != t && ( ( d[ e ] = t ), C( e ), ( n = r != d[ e ] ) ), n;
			},
			L = function ( e ) {
				f[ e ] ||
					( f[ e ] = function ( t ) {
						return arguments.length ?
							( "duration" === e && ( o = void 0 ),
								F( e, t ) &&
								( f.trigger( "change", {
										what: e,
										newval: d[ e ],
									} ),
									r.shifts.indexOf( e ) > -1 &&
									f.trigger( "shift", {
										reason: e,
									} ) ),
								f ) :
							d[ e ];
					} );
			};
		( this.controller = function () {
			return s;
		} ),
		( this.state = function () {
			return h;
		} ),
		( this.scrollOffset = function () {
			return p.start;
		} ),
		( this.triggerPosition = function () {
			var e = d.offset;
			return (
				s && ( e += d.triggerElement ? v : s.info( "size" ) * f.triggerHook() ),
				e
			);
		} );
		var T, A;
		f.on( "shift.internal", function ( e ) {
				var t = "duration" === e.reason;
				( ( h === c && t ) || ( h === l && 0 === d.duration ) ) && O(), t && _();
			} )
			.on( "progress.internal", function () {
				O();
			} )
			.on( "add.internal", function () {
				_();
			} )
			.on( "destroy.internal", function ( e ) {
				f.removePin( e.reset );
			} );
		var O = function ( e ) {
				if ( T && s ) {
					var t = s.info(),
						n = A.spacer.firstChild;
					if ( e || h !== l ) {
						var r = {
								position: A.inFlow ? "relative" : "absolute",
								top: 0,
								left: 0,
							},
							o = i.css( n, "position" ) != r.position;
						A.pushFollowers ?
							d.duration > 0 &&
							( h === c && 0 === parseFloat( i.css( A.spacer, "padding-top" ) ) ?
								( o = !0 ) :
								h === a &&
								0 === parseFloat( i.css( A.spacer, "padding-bottom" ) ) &&
								( o = !0 ) ) :
							( r[ t.vertical ? "top" : "left" ] = d.duration * g ),
							i.css( n, r ),
							o && _();
					} else {
						"fixed" != i.css( n, "position" ) &&
							( i.css( n, {
									position: "fixed",
								} ),
								_() );
						var u = i.get.offset( A.spacer, !0 ),
							f =
							d.reverse || 0 === d.duration ?
							t.scrollPos - p.start :
							Math.round( g * d.duration * 10 ) / 10;
						( u[ t.vertical ? "top" : "left" ] += f ),
						i.css( A.spacer.firstChild, {
							top: u.top,
							left: u.left,
						} );
					}
				}
			},
			_ = function () {
				if ( T && s && A.inFlow ) {
					var e = h === l,
						t = s.info( "vertical" ),
						n = A.spacer.firstChild,
						r = i.isMarginCollapseType( i.css( A.spacer, "display" ) ),
						o = {};
					A.relSize.width || A.relSize.autoFullWidth ?
						e ?
						i.css( T, {
							width: i.get.width( A.spacer ),
						} ) :
						i.css( T, {
							width: "100%",
						} ) :
						( ( o[ "min-width" ] = i.get.width( t ? T : n, !0, !0 ) ),
							( o.width = e ? o[ "min-width" ] : "auto" ) ),
						A.relSize.height ?
						e ?
						i.css( T, {
							height: i.get.height( A.spacer ) -
								( A.pushFollowers ? d.duration : 0 ),
						} ) :
						i.css( T, {
							height: "100%",
						} ) :
						( ( o[ "min-height" ] = i.get.height( t ? n : T, !0, !r ) ),
							( o.height = e ? o[ "min-height" ] : "auto" ) ),
						A.pushFollowers &&
						( ( o[ "padding" + ( t ? "Top" : "Left" ) ] = d.duration * g ),
							( o[ "padding" + ( t ? "Bottom" : "Right" ) ] =
								d.duration * ( 1 - g ) ) ),
						i.css( A.spacer, o );
				}
			},
			N = function () {
				s && T && h === l && !s.info( "isDocument" ) && O();
			},
			P = function () {
				s &&
					T &&
					h === l &&
					( ( ( A.relSize.width || A.relSize.autoFullWidth ) &&
							i.get.width( window ) != i.get.width( A.spacer.parentNode ) ) ||
						( A.relSize.height &&
							i.get.height( window ) != i.get.height( A.spacer.parentNode ) ) ) &&
					_();
			},
			D = function ( e ) {
				s &&
					T &&
					h === l &&
					!s.info( "isDocument" ) &&
					( e.preventDefault(),
						s._setScrollPos(
							s.info( "scrollPos" ) -
							( ( e.wheelDelta ||
									e[ s.info( "vertical" ) ? "wheelDeltaY" : "wheelDeltaX" ] ) / 3 ||
								30 * -e.detail )
						) );
			};
		( this.setPin = function ( e, n ) {
			var r = {
				pushFollowers: !0,
				spacerClass: "scrollmagic-pin-spacer",
			};
			if ( ( ( n = i.extend( {}, r, n ) ), ( e = i.get.elements( e )[ 0 ] ), !e ) )
				return f;
			if ( "fixed" === i.css( e, "position" ) ) return f;
			if ( T ) {
				if ( T === e ) return f;
				f.removePin();
			}
			T = e;
			var o = T.parentNode.style.display,
				s = [
					"top",
					"left",
					"bottom",
					"right",
					"margin",
					"marginLeft",
					"marginRight",
					"marginTop",
					"marginBottom",
				];
			T.parentNode.style.display = "none";
			var a = "absolute" != i.css( T, "position" ),
				l = i.css( T, s.concat( [ "display" ] ) ),
				c = i.css( T, [ "width", "height" ] );
			( T.parentNode.style.display = o ),
			!a && n.pushFollowers && ( n.pushFollowers = !1 );
			var u = T.parentNode.insertBefore( document.createElement( "div" ), T ),
				d = i.extend( l, {
					position: a ? "relative" : "absolute",
					boxSizing: "content-box",
					mozBoxSizing: "content-box",
					webkitBoxSizing: "content-box",
				} );
			if (
				( a || i.extend( d, i.css( T, [ "width", "height" ] ) ),
					i.css( u, d ),
					u.setAttribute( t, "" ),
					i.addClass( u, n.spacerClass ),
					( A = {
						spacer: u,
						relSize: {
							width: "%" === c.width.slice( -1 ),
							height: "%" === c.height.slice( -1 ),
							autoFullWidth: "auto" === c.width && a && i.isMarginCollapseType( l.display ),
						},
						pushFollowers: n.pushFollowers,
						inFlow: a,
					} ),
					!T.___origStyle )
			) {
				T.___origStyle = {};
				var h = T.style,
					g = s.concat( [
						"width",
						"height",
						"position",
						"boxSizing",
						"mozBoxSizing",
						"webkitBoxSizing",
					] );
				g.forEach( function ( e ) {
					T.___origStyle[ e ] = h[ e ] || "";
				} );
			}
			return (
				A.relSize.width &&
				i.css( u, {
					width: c.width,
				} ),
				A.relSize.height &&
				i.css( u, {
					height: c.height,
				} ),
				u.appendChild( T ),
				i.css( T, {
					position: a ? "relative" : "absolute",
					margin: "auto",
					top: "auto",
					left: "auto",
					bottom: "auto",
					right: "auto",
				} ),
				( A.relSize.width || A.relSize.autoFullWidth ) &&
				i.css( T, {
					boxSizing: "border-box",
					mozBoxSizing: "border-box",
					webkitBoxSizing: "border-box",
				} ),
				window.addEventListener( "scroll", N ),
				window.addEventListener( "resize", N ),
				window.addEventListener( "resize", P ),
				T.addEventListener( "mousewheel", D ),
				T.addEventListener( "DOMMouseScroll", D ),
				O(),
				f
			);
		} ),
		( this.removePin = function ( e ) {
			if ( T ) {
				if ( ( h === l && O( !0 ), e || !s ) ) {
					var n = A.spacer.firstChild;
					if ( n.hasAttribute( t ) ) {
						var r = A.spacer.style,
							o = [
								"margin",
								"marginLeft",
								"marginRight",
								"marginTop",
								"marginBottom",
							];
						( margins = {} ),
						o.forEach( function ( e ) {
								margins[ e ] = r[ e ] || "";
							} ),
							i.css( n, margins );
					}
					A.spacer.parentNode.insertBefore( n, A.spacer ),
						A.spacer.parentNode.removeChild( A.spacer ),
						T.parentNode.hasAttribute( t ) ||
						( i.css( T, T.___origStyle ), delete T.___origStyle );
				}
				window.removeEventListener( "scroll", N ),
					window.removeEventListener( "resize", N ),
					window.removeEventListener( "resize", P ),
					T.removeEventListener( "mousewheel", D ),
					T.removeEventListener( "DOMMouseScroll", D ),
					( T = void 0 );
			}
			return f;
		} );
		var R,
			k = [];
		return (
			f.on( "destroy.internal", function ( e ) {
				f.removeClassToggle( e.reset );
			} ),
			( this.setClassToggle = function ( e, t ) {
				var n = i.get.elements( e );
				return 0 !== n.length && i.type.String( t ) ?
					( k.length > 0 && f.removeClassToggle(),
						( R = t ),
						( k = n ),
						f.on( "enter.internal_class leave.internal_class", function ( e ) {
							var t = "enter" === e.type ? i.addClass : i.removeClass;
							k.forEach( function ( e ) {
								t( e, R );
							} );
						} ),
						f ) :
					f;
			} ),
			( this.removeClassToggle = function ( e ) {
				return (
					e &&
					k.forEach( function ( e ) {
						i.removeClass( e, R );
					} ),
					f.off( "start.internal_class end.internal_class" ),
					( R = void 0 ),
					( k = [] ),
					f
				);
			} ),
			w(),
			f
		);
	} );
	var r = {
		defaults: {
			duration: 0,
			offset: 0,
			triggerElement: void 0,
			triggerHook: 0.5,
			reverse: !0,
			loglevel: 2,
		},
		validate: {
			offset: function ( e ) {
				if ( ( ( e = parseFloat( e ) ), !i.type.Number( e ) ) ) throw 0;
				return e;
			},
			triggerElement: function ( e ) {
				if ( ( e = e || void 0 ) ) {
					var t = i.get.elements( e )[ 0 ];
					if ( !t ) throw 0;
					e = t;
				}
				return e;
			},
			triggerHook: function ( e ) {
				var t = {
					onCenter: 0.5,
					onEnter: 1,
					onLeave: 0,
				};
				if ( i.type.Number( e ) ) e = Math.max( 0, Math.min( parseFloat( e ), 1 ) );
				else {
					if ( !( e in t ) ) throw 0;
					e = t[ e ];
				}
				return e;
			},
			reverse: function ( e ) {
				return !!e;
			},
		},
		shifts: [ "duration", "offset", "triggerHook" ],
	};
	( e.Scene.addOption = function ( e, t, n, i ) {
		e in r.defaults ||
			( ( r.defaults[ e ] = t ), ( r.validate[ e ] = n ), i && r.shifts.push( e ) );
	} ),
	( e.Scene.extend = function ( t ) {
		var n = this;
		( e.Scene = function () {
			return (
				n.apply( this, arguments ),
				( this.$super = i.extend( {}, this ) ),
				t.apply( this, arguments ) || this
			);
		} ),
		i.extend( e.Scene, n ),
			( e.Scene.prototype = n.prototype ),
			( e.Scene.prototype.constructor = e.Scene );
	} ),
	( e.Event = function ( e, t, n, r ) {
		r = r || {};
		for ( var i in r ) this[ i ] = r[ i ];
		return (
			( this.type = e ),
			( this.target = this.currentTarget = n ),
			( this.namespace = t || "" ),
			( this.timeStamp = this.timestamp = Date.now() ),
			this
		);
	} );
	var i = ( e._util = ( function ( e ) {
		var t,
			n = {},
			r = function ( e ) {
				return parseFloat( e ) || 0;
			},
			i = function ( t ) {
				return t.currentStyle ? t.currentStyle : e.getComputedStyle( t );
			},
			o = function ( t, n, o, s ) {
				if ( ( ( n = n === document ? e : n ), n === e ) ) s = !1;
				else if ( !f.DomElement( n ) ) return 0;
				t = t.charAt( 0 ).toUpperCase() + t.substr( 1 ).toLowerCase();
				var a =
					( o ?
						n[ "offset" + t ] || n[ "outer" + t ] :
						n[ "client" + t ] || n[ "inner" + t ] ) || 0;
				if ( o && s ) {
					var l = i( n );
					a +=
						"Height" === t ?
						r( l.marginTop ) + r( l.marginBottom ) :
						r( l.marginLeft ) + r( l.marginRight );
				}
				return a;
			},
			s = function ( e ) {
				return e
					.replace( /^[^a-z]+([a-z])/g, "$1" )
					.replace( /-([a-z])/g, function ( e ) {
						return e[ 1 ].toUpperCase();
					} );
			};
		( n.extend = function ( e ) {
			for ( e = e || {}, t = 1; t < arguments.length; t++ )
				if ( arguments[ t ] )
					for ( var n in arguments[ t ] )
						arguments[ t ].hasOwnProperty( n ) && ( e[ n ] = arguments[ t ][ n ] );
			return e;
		} ),
		( n.isMarginCollapseType = function ( e ) {
			return (
				[ "block", "flex", "list-item", "table", "-webkit-box" ].indexOf( e ) > -1
			);
		} );
		var a = 0,
			l = [ "ms", "moz", "webkit", "o" ],
			c = e.requestAnimationFrame,
			u = e.cancelAnimationFrame;
		for ( t = 0; !c && t < l.length; ++t )
			( c = e[ l[ t ] + "RequestAnimationFrame" ] ),
			( u =
				e[ l[ t ] + "CancelAnimationFrame" ] ||
				e[ l[ t ] + "CancelRequestAnimationFrame" ] );
		c ||
			( c = function ( t ) {
				var n = new Date().getTime(),
					r = Math.max( 0, 16 - ( n - a ) ),
					i = e.setTimeout( function () {
						t( n + r );
					}, r );
				return ( a = n + r ), i;
			} ),
			u ||
			( u = function ( t ) {
				e.clearTimeout( t );
			} ),
			( n.rAF = c.bind( e ) ),
			( n.cAF = u.bind( e ) );
		var f = ( n.type = function ( e ) {
			return Object.prototype.toString
				.call( e )
				.replace( /^\[object (.+)\]$/, "$1" )
				.toLowerCase();
		} );
		( f.String = function ( e ) {
			return "string" === f( e );
		} ),
		( f.Function = function ( e ) {
			return "function" === f( e );
		} ),
		( f.Array = function ( e ) {
			return Array.isArray( e );
		} ),
		( f.Number = function ( e ) {
			return !f.Array( e ) && e - parseFloat( e ) + 1 >= 0;
		} ),
		( f.DomElement = function ( e ) {
			return "object" == typeof HTMLElement ?
				e instanceof HTMLElement :
				e &&
				"object" == typeof e &&
				null !== e &&
				1 === e.nodeType &&
				"string" == typeof e.nodeName;
		} );
		var d = ( n.get = {} );
		return (
			( d.elements = function ( t ) {
				var n = [];
				if ( f.String( t ) )
					try {
						t = document.querySelectorAll( t );
					} catch ( e ) {
						return n;
					}
				if ( "nodelist" === f( t ) || f.Array( t ) )
					for ( var r = 0, i = ( n.length = t.length ); i > r; r++ ) {
						var o = t[ r ];
						n[ r ] = f.DomElement( o ) ? o : d.elements( o );
					}
				else( f.DomElement( t ) || t === document || t === e ) && ( n = [ t ] );
				return n;
			} ),
			( d.scrollTop = function ( t ) {
				return t && "number" == typeof t.scrollTop ?
					t.scrollTop :
					e.pageYOffset || 0;
			} ),
			( d.scrollLeft = function ( t ) {
				return t && "number" == typeof t.scrollLeft ?
					t.scrollLeft :
					e.pageXOffset || 0;
			} ),
			( d.width = function ( e, t, n ) {
				return o( "width", e, t, n );
			} ),
			( d.height = function ( e, t, n ) {
				return o( "height", e, t, n );
			} ),
			( d.offset = function ( e, t ) {
				var n = {
					top: 0,
					left: 0,
				};
				if ( e && e.getBoundingClientRect ) {
					var r = e.getBoundingClientRect();
					( n.top = r.top ),
					( n.left = r.left ),
					t || ( ( n.top += d.scrollTop() ), ( n.left += d.scrollLeft() ) );
				}
				return n;
			} ),
			( n.addClass = function ( e, t ) {
				t && ( e.classList ? e.classList.add( t ) : ( e.className += " " + t ) );
			} ),
			( n.removeClass = function ( e, t ) {
				t &&
					( e.classList ?
						e.classList.remove( t ) :
						( e.className = e.className.replace(
							RegExp( "(^|\\b)" + t.split( " " ).join( "|" ) + "(\\b|$)", "gi" ),
							" "
						) ) );
			} ),
			( n.css = function ( e, t ) {
				if ( f.String( t ) ) return i( e )[ s( t ) ];
				if ( f.Array( t ) ) {
					var n = {},
						r = i( e );
					return (
						t.forEach( function ( e ) {
							n[ e ] = r[ s( e ) ];
						} ),
						n
					);
				}
				for ( var o in t ) {
					var a = t[ o ];
					a == parseFloat( a ) && ( a += "px" ), ( e.style[ s( o ) ] = a );
				}
			} ),
			n
		);
	} )( window || {} ) );
	return e;
} );
/*!ScrollMagic v2.0.5 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io*/
!( function ( e, n ) {
	"function" == typeof define && define.amd ?
		define( [ "ScrollMagic", "TweenMax", "TimelineMax" ], n ) :
		"object" == typeof exports ?
		( require( "gsap" ), n( require( "scrollmagic" ), TweenMax, TimelineMax ) ) :
		n(
			e.ScrollMagic || ( e.jQuery && e.jQuery.ScrollMagic ),
			e.TweenMax || e.TweenLite,
			e.TimelineMax || e.TimelineLite
		);
} )( this, function ( e, n, r ) {
	"use strict";
	e.Scene.addOption( "tweenChanges", !1, function ( e ) {
			return !!e;
		} ),
		e.Scene.extend( function () {
			var e,
				t = this;
			t.on( "progress.plugin_gsap", function () {
					i();
				} ),
				t.on( "destroy.plugin_gsap", function ( e ) {
					t.removeTween( e.reset );
				} );
			var i = function () {
				if ( e ) {
					var n = t.progress(),
						r = t.state();
					e.repeat && -1 === e.repeat() ?
						"DURING" === r && e.paused() ?
						e.play() :
						"DURING" === r || e.paused() || e.pause() :
						n != e.progress() &&
						( 0 === t.duration() ?
							n > 0 ?
							e.play() :
							e.reverse() :
							t.tweenChanges() && e.tweenTo ?
							e.tweenTo( n * e.duration() ) :
							e.progress( n ).pause() );
				}
			};
			( t.setTween = function ( o, a, s ) {
				var u;
				arguments.length > 1 &&
					( arguments.length < 3 && ( ( s = a ), ( a = 1 ) ), ( o = n.to( o, a, s ) ) );
				try {
					( u = r ?
						new r( {
							smoothChildTiming: !0,
						} ).add( o ) :
						o ),
					u.pause();
				} catch ( p ) {
					return t;
				}
				return (
					e && t.removeTween(),
					( e = u ),
					o.repeat && -1 === o.repeat() && ( e.repeat( -1 ), e.yoyo( o.yoyo() ) ),
					i(),
					t
				);
			} ),
			( t.removeTween = function ( n ) {
				return e && ( n && e.progress( 0 ).pause(), e.kill(), ( e = void 0 ) ), t;
			} );
		} );
} );
/*!
 *
 */
!( function ( a, b ) {
	"use strict";
	"function" == typeof define && define.amd ?
		define( [], b ) :
		"object" == typeof exports ?
		( module.exports = b() ) :
		( a.Headroom = b() );
} )( this, function () {
	"use strict";

	function a( a ) {
		( this.callback = a ), ( this.ticking = !1 );
	}

	function b( a ) {
		return a && "undefined" != typeof window && ( a === window || a.nodeType );
	}

	function c( a ) {
		if ( arguments.length <= 0 )
			throw new Error( "Missing arguments in extend function" );
		var d,
			e,
			f = a || {};
		for ( e = 1; e < arguments.length; e++ ) {
			var g = arguments[ e ] || {};
			for ( d in g )
				"object" != typeof f[ d ] || b( f[ d ] ) ?
				( f[ d ] = f[ d ] || g[ d ] ) :
				( f[ d ] = c( f[ d ], g[ d ] ) );
		}
		return f;
	}

	function d( a ) {
		return a === Object( a ) ?
			a :
			{
				down: a,
				up: a,
			};
	}

	function e( a, b ) {
		( b = c( b, e.options ) ),
		( this.lastKnownScrollY = 0 ),
		( this.elem = a ),
		( this.tolerance = d( b.tolerance ) ),
		( this.classes = b.classes ),
		( this.offset = b.offset ),
		( this.scroller = b.scroller ),
		( this.initialised = !1 ),
		( this.onPin = b.onPin ),
		( this.onUnpin = b.onUnpin ),
		( this.onTop = b.onTop ),
		( this.onNotTop = b.onNotTop ),
		( this.onBottom = b.onBottom ),
		( this.onNotBottom = b.onNotBottom );
	}
	var f = {
		bind: !! function () {}.bind,
		classList: "classList" in document.documentElement,
		rAF: !!(
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame
		),
	};
	return (
		( window.requestAnimationFrame =
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ),
		( a.prototype = {
			constructor: a,
			update: function () {
				this.callback && this.callback(), ( this.ticking = !1 );
			},
			requestTick: function () {
				this.ticking ||
					( requestAnimationFrame(
							this.rafCallback || ( this.rafCallback = this.update.bind( this ) )
						),
						( this.ticking = !0 ) );
			},
			handleEvent: function () {
				this.requestTick();
			},
		} ),
		( e.prototype = {
			constructor: e,
			init: function () {
				return e.cutsTheMustard ?
					( ( this.debouncer = new a( this.update.bind( this ) ) ),
						this.elem.classList.add( this.classes.initial ),
						setTimeout( this.attachEvent.bind( this ), 100 ),
						this ) :
					void 0;
			},
			destroy: function () {
				var a = this.classes;
				( this.initialised = !1 ),
				this.elem.classList.remove(
						a.unpinned,
						a.pinned,
						a.top,
						a.notTop,
						a.initial
					),
					this.scroller.removeEventListener( "scroll", this.debouncer, !1 );
			},
			attachEvent: function () {
				this.initialised ||
					( ( this.lastKnownScrollY = this.getScrollY() ),
						( this.initialised = !0 ),
						this.scroller.addEventListener( "scroll", this.debouncer, !1 ),
						this.debouncer.handleEvent() );
			},
			unpin: function () {
				var a = this.elem.classList,
					b = this.classes;
				( !a.contains( b.pinned ) && a.contains( b.unpinned ) ) ||
				( a.add( b.unpinned ),
					a.remove( b.pinned ),
					this.onUnpin && this.onUnpin.call( this ) );
			},
			pin: function () {
				var a = this.elem.classList,
					b = this.classes;
				a.contains( b.unpinned ) &&
					( a.remove( b.unpinned ),
						a.add( b.pinned ),
						this.onPin && this.onPin.call( this ) );
			},
			top: function () {
				var a = this.elem.classList,
					b = this.classes;
				a.contains( b.top ) ||
					( a.add( b.top ),
						a.remove( b.notTop ),
						this.onTop && this.onTop.call( this ) );
			},
			notTop: function () {
				var a = this.elem.classList,
					b = this.classes;
				a.contains( b.notTop ) ||
					( a.add( b.notTop ),
						a.remove( b.top ),
						this.onNotTop && this.onNotTop.call( this ) );
			},
			bottom: function () {
				var a = this.elem.classList,
					b = this.classes;
				a.contains( b.bottom ) ||
					( a.add( b.bottom ),
						a.remove( b.notBottom ),
						this.onBottom && this.onBottom.call( this ) );
			},
			notBottom: function () {
				var a = this.elem.classList,
					b = this.classes;
				a.contains( b.notBottom ) ||
					( a.add( b.notBottom ),
						a.remove( b.bottom ),
						this.onNotBottom && this.onNotBottom.call( this ) );
			},
			getScrollY: function () {
				return void 0 !== this.scroller.pageYOffset ?
					this.scroller.pageYOffset :
					void 0 !== this.scroller.scrollTop ?
					this.scroller.scrollTop :
					(
						document.documentElement ||
						document.body.parentNode ||
						document.body
					).scrollTop;
			},
			getViewportHeight: function () {
				return (
					window.innerHeight ||
					document.documentElement.clientHeight ||
					document.body.clientHeight
				);
			},
			getElementPhysicalHeight: function ( a ) {
				return Math.max( a.offsetHeight, a.clientHeight );
			},
			getScrollerPhysicalHeight: function () {
				return this.scroller === window || this.scroller === document.body ?
					this.getViewportHeight() :
					this.getElementPhysicalHeight( this.scroller );
			},
			getDocumentHeight: function () {
				var a = document.body,
					b = document.documentElement;
				return Math.max(
					a.scrollHeight,
					b.scrollHeight,
					a.offsetHeight,
					b.offsetHeight,
					a.clientHeight,
					b.clientHeight
				);
			},
			getElementHeight: function ( a ) {
				return Math.max( a.scrollHeight, a.offsetHeight, a.clientHeight );
			},
			getScrollerHeight: function () {
				return this.scroller === window || this.scroller === document.body ?
					this.getDocumentHeight() :
					this.getElementHeight( this.scroller );
			},
			isOutOfBounds: function ( a ) {
				var b = 0 > a,
					c = a + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
				return b || c;
			},
			toleranceExceeded: function ( a, b ) {
				return Math.abs( a - this.lastKnownScrollY ) >= this.tolerance[ b ];
			},
			shouldUnpin: function ( a, b ) {
				var c = a > this.lastKnownScrollY,
					d = a >= this.offset;
				return c && d && b;
			},
			shouldPin: function ( a, b ) {
				var c = a < this.lastKnownScrollY,
					d = a <= this.offset;
				return ( c && b ) || d;
			},
			update: function () {
				var a = this.getScrollY(),
					b = a > this.lastKnownScrollY ? "down" : "up",
					c = this.toleranceExceeded( a, b );
				this.isOutOfBounds( a ) ||
					( a <= this.offset ? this.top() : this.notTop(),
						a + this.getViewportHeight() >= this.getScrollerHeight() ?
						this.bottom() :
						this.notBottom(),
						this.shouldUnpin( a, c ) ?
						this.unpin() :
						this.shouldPin( a, c ) && this.pin(),
						( this.lastKnownScrollY = a ) );
			},
		} ),
		( e.options = {
			tolerance: {
				up: 0,
				down: 0,
			},
			offset: 0,
			scroller: window,
			classes: {
				pinned: "headroom--pinned",
				unpinned: "headroom--unpinned",
				top: "headroom--top",
				notTop: "headroom--not-top",
				bottom: "headroom--bottom",
				notBottom: "headroom--not-bottom",
				initial: "headroom",
			},
		} ),
		( e.cutsTheMustard =
			"undefined" != typeof f && f.rAF && f.bind && f.classList ),
		e
	);
} );
$( ".currLink" ).click( function ( event ) {
	event.preventDefault();
	return false;
} );
if ( navigator.serviceWorker ) {}
if ( !Modernizr.svg ) {
	$( 'img[src*="svg"]' ).attr( "src", function () {
		return $( this ).attr( "src" ).replace( ".svg", ".png" );
	} );
}
$ani.runWebPImgs = function ( $elem, str ) {
	Modernizr.on( "webp", function ( result ) {
		if ( str === undefined ) {
			var str = "";
		}
		if ( result ) {
			$elem.find( "image" ).each( function () {
				var $this = $( this ),
					replaceStr,
					$dataSrc = $this.attr( "data-src" );
				if ( $dataSrc === undefined || $dataSrc === "" ) {
					return;
				}
				replaceStr = $dataSrc.indexOf( ".png" ) !== -1 ? "png" : "jpg";
				$this.attr(
					"xlink:href",
					str + $this.attr( "data-src" ).replace( replaceStr, "webp" )
				);
			} );
			$elem.find( "img" ).each( function () {
				var $this = $( this ),
					replaceStr,
					$dataSrc = $this.attr( "data-src" );
				if ( $dataSrc === undefined || $dataSrc === "" ) {
					return;
				}
				replaceStr = $dataSrc.indexOf( ".png" ) !== -1 ? "png" : "jpg";
				$this.attr(
					"src",
					str + $this.attr( "data-src" ).replace( replaceStr, "webp" )
				);
			} );
		} else {
			$elem.find( "image" ).each( function () {
				var $this = $( this ),
					src = $this.attr( "data-src" );
				if ( src === undefined || src === "" ) {
					return;
				}
				$this.attr( "xlink:href", str + src );
			} );
			$elem.find( "img" ).each( function () {
				var $this = $( this ),
					src = $this.attr( "data-src" );
				if ( src === undefined || src === "" ) {
					return;
				}
				$this.attr( "src", str + src );
			} );
		}
	} );
};
$ani.runWebPImgs( $( "body" ), "" );
( function ( w ) {
	if ( w.isMobile.any && w.$ani.winWidth < 600 ) {
		var hwrap = document.querySelector( "header .wrap" );
		var hr = new Headroom( hwrap, {
			onPin: function () {
				TweenMax.to( hwrap, 0.2, {
					y: "0%",
					opacity: 1,
					ease: Power3.easeInOut,
				} );
			},
			onUnpin: function () {
				TweenMax.to( hwrap, 0.2, {
					y: "-100%",
					opacity: 0,
					ease: Power3.easeInOut,
				} );
			},
		} );
		hr.init();
	}
	if ( $( "html" ).hasClass( "index" ) ) {
		var $introAnim = $( "#introAnim" ),
			homeSVG = document.getElementById( "homeSVG" ),
			home = document.getElementById( "homeWrap" ),
			$hello = $( "#helloGreetings" );

		function generateSVGAndAppend( svgID, svgClass, parentID ) {
			var svgElem = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"svg"
			);
			svgElem.setAttribute( "id", svgID );

			document.getElementById( parentID ).appendChild( svgElem );
		}
		w.$ani.attachHomeMouseEvents = function () {
			if ( !w.isMobile.tablet ) {
				var goldenNo = $ani.winWidth / 5 > 250 ? 250 : $ani.winWidth / 5,
					svgPolys = document.querySelectorAll( ".svgPolys" ),
					update = function ( e ) {
						var X = e ? e.pageX : 0,
							Y = e ? e.pageY : 0,
							rotateYdeg = ( ( $ani.winWidthHalf - X ) / 20 ).toFixed( 1 ),
							rotateXdeg = ( -( ( $ani.winHeightHalf - Y ) / 20 ) ).toFixed( 1 );
						TweenMax.to( "#homeSVG", 0.3, {
							rotationY: rotateYdeg,
							rotationX: rotateXdeg,
							ease: Power4.easeOut,
						} );
						TweenMax.to( $hello, 0.3, {
							x: X / 120,
							y: Y / 120,
						} );
					},
					homeSVGTimer;
				for ( var i = 0; i < svgPolys.length; i++ ) {
					svgPolys[ i ].style[ Modernizr.prefixed( "transform" ) ] =
						"translateZ(" + ( Math.floor( Math.random() * goldenNo ) + 1 ) + "px)";
				}
				document.getElementById( "homeTextWrap" ).style[
					Modernizr.prefixed( "transform" )
				] = "translateZ(1000px)";
				home.addEventListener( "mousemove", function ( e ) {
					update( e );
				} );
			}
		};
		w.$ani.holdHomeMouseEvents = function () {
			$( "#homeSVG,.svgPolys" ).css( "transform", "none !important" );
		};
		w.$ani.unHoldHomeMouseEvents = function () {
			$( "#homeSVG,.svgPolys" ).css( "transform", "none" );
		};
		var svgParams = {
				viewBox: "0 0 862.9 544.8",
				xmlns: "http://www.w3.org/2000/svg",
				version: "1.1",
				"xmlns:xlink": "http://www.w3.org/1999/xlink",
				x: 0,
				y: 0,
				width: "862.9px",
				height: "544.8px",
			},
			polysInSVG = 10,
			purpleFrontPoints = [
				[ 344.6, 1.3, 189.4, 192.5, 425, 140.8 ],
				[ 344.6, 1.3, 189.4, 192.5, 179.8, 151.7 ],
				[ 344.2, 1.4, 425, 140.8, 556.9, 69 ],
				[ 179.8, 151.7, 189.4, 192.5, 227.6, 369.7 ],
				[ 556.9, 69, 425, 140.8, 604.7, 287 ],
				[ 189.4, 192.5, 352.2, 370.9, 425, 140.8 ],
				[ 227.6, 369.7, 352.2, 370.9, 189.4, 192.5 ],
				[ 604.7, 287, 351.9, 371, 425, 140.8 ],
				[ 351.9, 371, 440.2, 437.3, 227.6, 369.7 ],
				[ 352.2, 370.9, 439.9, 437.4, 604.7, 287 ],
			],
			purpleBackPoints = [
				[ 439.9, 437.4, 595, 246.3, 359.5, 297.9 ],
				[ 439.9, 437.4, 595, 246.3, 604.7, 287 ],
				[ 440.2, 437.3, 359.5, 297.9, 227.6, 369.7 ],
				[ 604.7, 287, 595, 246.3, 556.9, 69 ],
				[ 227.6, 369.7, 359.5, 297.9, 179.7, 151.7 ],
				[ 595, 246.3, 432.2, 67.8, 359.5, 297.9 ],
				[ 556.9, 69, 432.2, 67.8, 595, 246.3 ],
				[ 179.7, 151.7, 432.6, 67.7, 359.5, 297.9 ],
				[ 432.6, 67.7, 344.2, 1.4, 556.9, 69 ],
				[ 432.2, 67.8, 344.6, 1.3, 179.7, 151.7 ],
			],
			greenFrontPoints = [
				[ 712.7, 97.3, 853.2, 270.2, 640, 223.5 ],
				[ 712.7, 97.3, 853.2, 270.2, 861.9, 233.4 ],
				[ 713.1, 97.4, 640, 223.5, 520.7, 158.5 ],
				[ 861.9, 233.4, 853.2, 270.2, 818.7, 430.6 ],
				[ 520.7, 158.5, 640, 223.5, 477.4, 355.7 ],
				[ 853.2, 270.2, 705.9, 431.7, 640, 223.5 ],
				[ 818.7, 430.6, 705.9, 431.7, 853.2, 270.2 ],
				[ 477.4, 355.7, 706.2, 431.8, 640, 223.5 ],
				[ 706.2, 431.8, 626.2, 491.7, 818.7, 430.6 ],
				[ 705.9, 431.7, 626.6, 491.8, 477.4, 355.7 ],
			];
		( greenBackPoints = [
			[ 626.6, 491.8, 486.2, 318.9, 699.3, 365.7 ],
			[ 626.6, 491.8, 486.2, 318.9, 477.4, 355.7 ],
			[ 626.2, 491.7, 699.3, 365.7, 818.7, 430.6 ],
			[ 477.4, 355.7, 486.2, 318.9, 520.7, 158.5 ],
			[ 818.7, 430.6, 699.3, 365.7, 861.9, 233.4 ],
			[ 486.2, 318.9, 633.5, 157.4, 699.3, 365.7 ],
			[ 520.7, 158.5, 633.5, 157.4, 486.2, 318.9 ],
			[ 861.9, 233.4, 633.1, 157.4, 699.3, 365.7 ],
			[ 633.1, 157.4, 713.1, 97.4, 520.7, 158.5 ],
			[ 633.5, 157.4, 712.7, 97.3, 861.9, 233.4 ],
		] ),
		( yellowFrontPoints = [
			[ 123.3, 338.8, 196.4, 428.7, 85.5, 404.4 ],
			[ 123.3, 338.8, 196.4, 428.7, 200.9, 409.5 ],
			[ 123.5, 338.8, 85.5, 404.4, 23.5, 370.6 ],
			[ 200.9, 409.5, 196.4, 428.7, 178.4, 512.1 ],
			[ 23.5, 370.6, 85.5, 404.4, 1, 473.2 ],
			[ 196.4, 428.7, 119.8, 512.7, 85.5, 404.4 ],
			[ 178.4, 512.1, 119.8, 512.7, 196.4, 428.7 ],
			[ 1, 473.2, 119.9, 512.7, 85.5, 404.4 ],
			[ 119.9, 512.7, 78.4, 543.9, 178.4, 512.1 ],
			[ 119.8, 512.7, 78.5, 543.9, 1, 473.2 ],
		] );
		( yellowBackPoints = [
			[ 78.5, 543.9, 5.5, 454, 116.4, 478.3 ],
			[ 78.5, 543.9, 5.5, 454, 1, 473.2 ],
			[ 78.4, 543.9, 116.4, 478.3, 178.4, 512.1 ],
			[ 1, 473.2, 5.5, 454, 23.5, 370.6 ],
			[ 178.4, 512.1, 116.4, 478.3, 200.9, 409.5 ],
			[ 5.5, 454, 82.1, 370.1, 116.4, 478.3 ],
			[ 23.5, 370.6, 82.1, 370.1, 5.5, 454 ],
			[ 200.9, 409.5, 81.9, 370, 116.4, 478.3 ],
			[ 81.9, 370, 123.5, 338.8, 23.5, 370.6 ],
			[ 82.1, 370.1, 123.3, 338.8, 200.9, 409.5 ],
		] ),
		( purpleFrontPolys = [] ),
		( purpleBackPolys = [] ),
		( greenFrontPolys = [] ),
		( greenBackPolys = [] ),
		( yellowFrontPolys = [] ),
		( yellowBackPolys = [] ),
		( PSLogoPoints = [
			[]
		] );

		function generateMobileHomeSVGs( isTablet ) {
			function addmobileSVG(
				polySVG,
				polyArray,
				Polys,
				svgClass,
				parent,
				isTablet,
				num
			) {
				generateSVGAndAppend( polySVG, svgClass, parent );
				var s = Snap( "#" + polySVG ),
					loopTimes = Polys.length;
				s.attr( svgParams );
				if ( isTablet ) {
					loopTimes = 10;
				}
				if ( isTablet && num % 2 === 0 ) {
					for ( var a = 0; a < loopTimes; a++ ) {
						Polys.push( s.polygon( polyArray[ 15 - a ] ) );
					}
				} else {
					for ( var a = 0; a < 10; a++ ) {
						Polys.push( s.polygon( polyArray[ a ] ) );
					}
				}
			}
			var purpleFrontPts = purpleFrontPoints,
				purpleBackPts = purpleBackPoints,
				greenFrontPts = greenFrontPoints,
				greenBackPts = greenBackPoints,
				yellowFrontPts = yellowFrontPoints,
				yellowBackPts = yellowBackPoints;
			if ( isTablet ) {
				var purpleFrontPts = PSLogoPoints,
					purpleBackPts = PSLogoPoints,
					greenFrontPts = PSLogoPoints,
					greenBackPts = PSLogoPoints,
					yellowFrontPts = PSLogoPoints,
					yellowBackPts = PSLogoPoints;
			} else {
				isTablet === "mobile";
			}
			addmobileSVG(
				"purpleFront",
				purpleFrontPts,
				purpleFrontPolys,
				"svgPolys home-purple",
				"homeSVG",
				isTablet,
				0
			);
			addmobileSVG(
				"purpleBack",
				purpleBackPts,
				purpleBackPolys,
				"svgPolys home-purple-back",
				"homeSVG",
				isTablet,
				1
			);
			addmobileSVG(
				"greenFront",
				greenFrontPts,
				greenFrontPolys,
				"svgPolys home-green",
				"homeSVG",
				isTablet,
				2
			);
			addmobileSVG(
				"greenBack",
				greenBackPts,
				greenBackPolys,
				"svgPolys home-green-back",
				"homeSVG",
				isTablet,
				3
			);
			addmobileSVG(
				"yellowFront",
				yellowFrontPts,
				yellowFrontPolys,
				"svgPolys home-yellow",
				"homeSVG",
				isTablet,
				4
			);
			addmobileSVG(
				"yellowBack",
				yellowBackPts,
				yellowBackPolys,
				"svgPolys home-yellow-back",
				"homeSVG",
				isTablet,
				5
			);
		}
		mina.easeOutCubic = function ( n ) {
			return Math.pow( n - 1, 3 ) + 1;
		};


		function defineAnimThings() {
			new TimelineMax()
				.fromTo(
					$hello,
					0.8, {
						autoAlpha: 0,
						x: "80%",
					}, {
						autoAlpha: 1,
						x: "0%",
						ease: Power4.easeInOut,
					},
					0
				)
				.fromTo(
					homeSVG,
					1, {
						autoAlpha: 0,
						x: "-50%",
						scale: 0.4,
					}, {
						autoAlpha: 1,
						x: "0%",
						scale: 1,
						ease: Power2.easeInOut,
					},
					0
				)

				.addCallback( $ani.attachHomeMouseEvents, 4 );
		}
		var preloaderFadeOutTransformOrigin = "center center";
		if ( w.isMobile.any && w.$ani.winWidth < 600 ) {
			generateMobileHomeSVGs();
			defineAnimThings = function () {
				new TimelineMax()
					.fromTo(
						$hello,
						0.8, {
							autoAlpha: 0,
							y: "200%",
						}, {
							autoAlpha: 1,
							y: "0%",
							ease: Power4.easeInOut,
						},
						0
					)
					.fromTo(
						homeSVG,
						1, {
							autoAlpha: 0,
							y: "-100%",
							scale: 0.4,
						}, {
							autoAlpha: 1,
							y: "0%",
							scale: 1,
							ease: Power2.easeOut,
						},
						0
					);
			};
		} else {
			preloaderFadeOutTransformOrigin = "top left";
		}
		$ani.homeElemsAnim = function homeElemsAnim() {
			TweenMax.set( $hello, {
				autoAlpha: 0,
			} );
			TweenMax.set( homeSVG, {
				autoAlpha: 0,
			} );
			TweenMax.to( $introAnim, 1, {
				autoAlpha: 0,
				scale: 0,
				transformOrigin: preloaderFadeOutTransformOrigin,
				ease: Power4.easeIn,
				onComplete: function () {
					TweenMax.fromTo(
						"#mainLogo",
						1, {
							autoAlpha: 0,
							scale: 0,
						}, {
							ease: Back.easeOut,
							scale: 1,
							autoAlpha: 1,
						},
						700
					);
					TweenMax.fromTo(
						"#mainLogo + sup",
						1, {
							autoAlpha: 0,
						}, {
							ease: Back.easeOut,
							scale: 1,
							autoAlpha: 1,
						},
						700
					);
					$introAnim.remove();
					defineAnimThings();
				},
			} );
		};

		function CheckFormInput( $element ) {
			if ( $element.val() === "" ) {
				$element.closest( ".inputWrap" ).removeClass( "inputNotEmpty" );
			} else {
				$element.closest( ".inputWrap" ).addClass( "inputNotEmpty" );
			}
		}
		$( ".contactForm input,.contactForm textarea" ).each( function () {
			var $this = $( this );
			$this.blur( function () {
				CheckFormInput( $this );
			} );
			$this.keypress( function () {
				CheckFormInput( $this );
			} );
		} );

		function resetAllVals() {
			$( "#name" )
				.val( "" )
				.next( ".styledLabel" )
				.removeAttr( "aria-invalid" )
				.html( "" )
				.attr( "data-text", "name" );
			$( "#email" )
				.val( "" )
				.next( ".styledLabel" )
				.removeAttr( "aria-invalid" )
				.html( "" )
				.attr( "data-text", "email" );
			$( "#message" )
				.val( "" )
				.next( ".styledLabel" )
				.removeAttr( "aria-invalid" )
				.html( "" )
				.attr( "data-text", "message" );
			$( ".inputNotEmpty" ).removeClass( "inputNotEmpty" );
			$( "#contact" ).focus();
			setTimeout( function () {
				$( "#messageStatus" ).css( "color", "white" );
			}, 10000 );
		}
		var form = document.getElementById( "contactForm" );
		form.addEventListener( "submit", function ( e ) {
			e.preventDefault();
			var nameVal = $( "#name" ).val(),
				x = $( "#email" ).val(),
				atpos = x.indexOf( "@" ),
				dotpos = x.lastIndexOf( "." );
			$( ".styledLabel" ).removeAttr( "role" );
			if ( nameVal === "" || !nameVal.match( /^[a-zа-яА-ЯA-Z\s]+$/ ) ) {
				$( "#name" ).attr( "aria-invalid", "true" ).next( ".styledLabel" ).attr( {
					role: "alert",
					"data-text": "Пожалуйста введите имя",
				} );
				return false;
			} else {
				$( "#name" ).attr( "aria-invalid", "false" );
			}
			if ( x == "" ) {
				$( "#email" ).attr( "aria-invalid", "true" ).next( ".styledLabel" ).attr( {
					role: "alert",
					"data-text": "Пожалуйста введите ваш почтовый адрес",
				} );
				return false;
			} else if ( atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length ) {
				$( "#email" ).attr( "aria-invalid", "true" ).next( ".styledLabel" ).attr( {
					role: "alert",
					"data-text": "Пожалуйста введите корректный почтовый адрес!",
				} );
				return false;
			} else {
				$( "#email" ).attr( "aria-invalid", "false" );
			}
			if ( $( "#message" ).val() === "" ) {
				$( "#message" ).attr( "aria-invalid", "true" ).next( ".styledLabel" ).attr( {
					role: "alert",
					"data-text": "Пожалуйста введите сообщение",
				} );
				return false;
			} else {
				$( "#message" ).attr( "aria-invalid", "false" );
			}
			dataString = {
				name: $( "#name" ).val(),
				email: $( "#email" ).val(),
				message: $( "#message" ).val(),
			};
			$( "#messageStatus" )
				.css( "color", "#c22085" )
				.html( "Ваш запрос обрабатывается. Пожалуйста,подождите." )
				.attr( {
					role: "alert",
				} );

			function ajax( method, url, data, success, error ) {
				var xhr = new XMLHttpRequest();
				xhr.open( method, url );
				xhr.setRequestHeader( "Accept", "application/json" );
				xhr.onreadystatechange = function () {
					if ( xhr.readyState !== XMLHttpRequest.DONE ) return;
					if ( xhr.status === 200 ) {
						success( xhr.response, xhr.responseType );
					} else {
						error( xhr.status, xhr.response, xhr.responseType );
					}
				};
				xhr.send( data );
			}
			var formData = new FormData( form );
			ajax(
				"POST",
				"#",
				formData,
				function ( data ) {
					console.log( data );
					$( "#messageStatus" )
						.css( "color", "#c22085" )
						.html( "Спасибо вам. Ваше сообщение успешно доставлено" )
						.attr( {
							role: "alert",
						} );
					resetAllVals();
				},
				function () {
					$( "#messageStatus" )
						.css( "color", "#c22085" )
						.html(
							"Упс! Сервис не работает.<br> Но вы можете оставить сообщение по почте <a href='mailto:it-kntu@ukr.net'>it-kntu@ukr.net</a>"
						)
						.attr( {
							role: "alert",
						} );
				}
			);
			return false;
		} );
		var controller = new ScrollMagic.Controller();
		window.$ani.setSMAnim = function setSMAnim(
			tweenArray,
			triggerElement,
			triggerHook,
			dur,
			funcOnStart
		) {
			var tweenQuote = new TimelineMax();
			tweenQuote.add( tweenArray );
			new ScrollMagic.Scene( {
					triggerElement: triggerElement,
					triggerHook: triggerHook,
					duration: dur,
				} )
				.setTween( tweenQuote )
				.addTo( controller )
				.on( "start", funcOnStart );
		};

		function quoteAnimations( no ) {
			var quoteIcosaArray = [];
			if ( no % 2 === 0 ) {
				quoteIcosaArray.push(
					TweenMax.from( "#quote" + no + "Top", 0.5, {
						x: "100%",
						y: "-10%",
					} )
				);
				quoteIcosaArray.push(
					TweenMax.from( "#quote" + no + "Bottom", 0.5, {
						x: "-100%",
						y: "10%",
					} )
				);
			} else {
				quoteIcosaArray.push(
					TweenMax.from( "#quote" + no + "Top", 0.5, {
						x: "100%",
						y: "-10%",
					} )
				);
				quoteIcosaArray.push(
					TweenMax.from( "#quote" + no + "Bottom", 0.5, {
						x: "-100%",
						y: "10%",
					} )
				);
			}
			w.$ani.setSMAnim( quoteIcosaArray, "#quote" + no, "onEnter", "150%" );
			switch ( no ) {
				case 1:
					w.$ani.setSMAnim(
						[
							TweenMax.from( ".quote1Heart", 0.9, {
								strokeDashoffset: "1000",
								ease: Power1.easeIn,
							} ),
							TweenMax.from( ".quote1TextTop", 0.3, {
								x: "-60",
								ease: Power1.easeIn,
							} ),
							TweenMax.from( ".quote1TextBottom", 0.5, {
								x: "30",
								ease: Power1.easeIn,
							} ),
						],
						".quote1TextBottom",
						"onEnter",
						"60%"
					);
					break;
				case 2:
					w.$ani.setSMAnim(
						[
							TweenMax.from( "#quotePositiveTop", 2, {
								strokeDashoffset: "1000",
								ease: Power2.easeIn,
							} ),
							TweenMax.from( "#quotePositiveBottom", 0.9, {
								strokeDashoffset: "1000",
								delay: 0.8,
								ease: Power2.easeIn,
							} ),
							TweenMax.from( "#quote2TextTop", 1, {
								x: -50,
							} ),
							TweenMax.from( "#quote2TextBottom", 1, {
								x: 70,
							} ),
						],
						"#quotePositiveBottom",
						"onEnter",
						"60%"
					);
					break;
				case 3:
					w.$ani.setSMAnim(
						[
							TweenMax.from( ".quote3Poem", 1, {
								strokeDashoffset: "1200",
								ease: Power2.easeIn,
							} ),
							TweenMax.from( "#quote3Text", 0.75, {
								opacity: 0,
								scale: 0.2,
								x: "10%",
								transformOrigin: "center center",
								ease: Power2.easeIn,
							} ),
						],
						"#quote3 .quoteTextBG",
						"onEnter",
						"60%"
					);
					break;
				case 4:
					w.$ani.setSMAnim(
						[
							TweenMax.from( "#quote4Triangle", 1.5, {
								delay: 0.3,
								strokeDashoffset: "1000",
								ease: Power1.easeIn,
							} ),
						],
						"#quote4TextTop",
						"onEnter",
						"60%"
					);
					break;
				default:
					break;
			}
		}
		for ( var quoteNos = 1; quoteNos <= 4; quoteNos++ ) {
			quoteAnimations( quoteNos );
		}
		if ( w.$ani.winWidth < 601 ) {
			w.$ani.setSMAnim(
				[
					TweenMax.staggerFrom(
						".expLinks",
						0.5, {
							opacity: 0,
							ease: Expo.easeInOut,
							scale: 0,
							transformOrigin: "center",
						},
						0.1
					),
					TweenMax.staggerFrom(
						".expFrame",
						0.5, {
							delay: 0.1,
							scale: 0,
							opacity: 0,
							ease: Expo.easeInOut,
							scale: 0,
							transformOrigin: "center",
						},
						0.1
					),
				],
				"#experiments",
				0.4,
				0
			);
		} else {
			w.$ani.setSMAnim(
				[
					TweenMax.staggerFromTo(
						".expFrame",
						1, {
							x: "-10%",
							y: "-7%",
						}, {
							x: "0%",
							y: "0%",
						}
					),
				],
				"#experimentsWrap",
				"onEnter",
				"50%"
			);
			w.$ani.setSMAnim(
				[
					TweenMax.fromTo(
						".expFrame",
						1, {
							x: "0%",
							y: "0%",
						}, {
							ease: Power3.easeOut,
							x: "10%",
							y: "7%",
						}
					),
				],
				"#experimentsWrap",
				0.2,
				"120%"
			);
		}
		$( "#projectsList li" ).each( function ( index ) {
			var $this = $( this );
			w.$ani.setSMAnim(
				[
					TweenMax.from( $this, 0.4, {
						opacity: 0,
						ease: Power1.easeOut,
					} ),
					TweenMax.fromTo(
						$( this ).find( ".reveler" ),
						1.8, {
							x: "100%",
						}, {
							x: "-100%",
							ease: Expo.easeOut,
						}
					),
					TweenMax.fromTo(
						$this.find( "article" ),
						1.3, {
							y: "100%",
						}, {
							delay: 0.3,
							y: "0%",
							ease: Expo.easeInOut,
						}
					),
				],
				this,
				"onEnter",
				0
			);
		} );
		TweenMax.set( "#aboutWindow,#aboutME,.aboutThoughtCloud", {
			transformOrigin: "center center",
		} );
		w.$ani.setSMAnim(
			[
				TweenMax.from( "#aboutWindow", 0.9, {
					scale: 0,
					ease: Expo.easeInOut,
					transformOrigin: "center top",
				} ),
				TweenMax.from( "#aboutME", 1, {
					delay: 0.3,
					scale: 0,
					delay: 0.6,
					ease: Back.easeOut,
					transformOrigin: "center 95%",
				} ),
				TweenMax.staggerFrom(
					".aboutThoughtCloud",
					0.5, {
						opacity: 0,
						ease: Expo.easeOut,
						delay: 0.4,
						scale: 0.5,
					},
					0.2
				),
			],
			"#about",
			0.4,
			"0"
		);
		if ( w.isMobile.any ) {
			TweenMax.set( "#icosaTraining path,#icosaTraining polygon", {
				transformOrigin: "center center",
			} );
			TweenMax.set( "#icosaTraining", {
				rotateX: 4,
			} );
			w.$ani.setSMAnim(
				[
					TweenMax.from(
						".trainingIcosa0",
						1, {
							ease: Back.easeInOut,
							scale: 0,
						},
						0
					),
					TweenMax.from(
						".trainingIcosa5",
						0.8, {
							ease: Power4.easeInOut,
							delay: 0.3,
							scale: 0,
							y: "3%",
						},
						"2.5"
					),
					TweenMax.from(
						".trainingIcosa1",
						0.7, {
							ease: Power2.easeInOut,
							delay: 1.4,
							scale: 0,
							y: "-150%",
						},
						"2.5"
					),
					TweenMax.from( ".trainingIcosa3", 0.9, {
						ease: Power3.easeInOut,
						delay: 1.1,
						autoAlpha: 0,
						scale: 2,
						y: "5%",
						x: "20%",
					} ),
					TweenMax.from( ".trainingIcosa2", 0.8, {
						ease: Back.easeOut,
						delay: 1.1,
						autoAlpha: 0,
						scale: 3,
						y: "10%",
					} ),
					TweenMax.from( ".trainingIcosa7", 0.7, {
						ease: Back.easeInOut,
						delay: 1.3,
						scale: 0,
					} ),
					TweenMax.from( ".trainingIcosa6", 1.4, {
						ease: Back.easeInOut,
						autoAlpha: 0,
						delay: 0.9,
						scale: 0,
					} ),
					TweenMax.from( ".trainingIcosa4", 0.4, {
						ease: Back.easeInOut,
						autoAlpha: 0,
						delay: 1,
						scale: 3,
					} ),
				],
				"#icosaTraining",
				0.5,
				0
			);
		} else {
			TweenMax.set( "#icosaTraining path,#icosaTraining polygon", {
				transformOrigin: "center center",
			} );
			w.$ani.setSMAnim(
				[
					TweenMax.from( ".trainingIcosa0", 0.5, {
						scale: 0,
					} ),
					TweenMax.from( ".trainingIcosa7", 0.6, {
						delay: 0.1,
						scale: 0,
					} ),
					TweenMax.from( ".trainingIcosa1", 1, {
						delay: 0.3,
						scale: 0,
						y: "-150%",
					} ),
					TweenMax.from( ".trainingIcosa2", 1, {
						delay: 0.4,
						scale: 0,
						y: "10%",
					} ),
					TweenMax.from( ".trainingIcosa3", 1, {
						delay: 0.6,
						scale: 0,
						y: "3%",
						x: "20%",
					} ),
					TweenMax.from( ".trainingIcosa5", 1, {
						delay: 0.7,
						scale: 0,
						y: "3%",
					} ),
					TweenMax.from( ".trainingIcosa6", 1, {
						delay: 0.7,
						scale: 0,
						y: "10%",
					} ),
					TweenMax.from( ".trainingIcosa4", 1, {
						delay: 0.7,
						scale: 0,
						y: "40%",
						x: "-50%",
					} ),
				],
				"#training",
				0.5,
				"50%"
			);
		}
	}
	var time = new Date().getHours();
	if ( time < 6 ) {
		$( "html" ).addClass( "night-time" );
		return true;
	} else if ( time < 10 ) {
		$( "html" ).addClass( "morning-time" );
		return true;
	} else if ( time < 13 ) {
		$( "html" ).addClass( "day-time" );
		return true;
	} else if ( time < 18 ) {
		$( "html" ).addClass( "evening-time" );
		return true;
	} else {
		$( "html" ).addClass( "late-evening-time" );
		return true;
	}
} )( window );
window.$ani.initCSAnims = function () {
	var controller2 = new ScrollMagic.Controller();

	function setSMAnim2(
		tweenArray,
		triggerElement,
		triggerHook,
		dur,
		funcOnStart,
		reverse
	) {
		var tweenQuote = new TimelineMax();
		tweenQuote.add( tweenArray );
		new ScrollMagic.Scene( {
				triggerElement: triggerElement,
				triggerHook: triggerHook,
				duration: dur,
				reverse: reverse,
			} )
			.setTween( tweenQuote )
			.addTo( controller2 )
			.on( "start", funcOnStart );
	}
	$( ".CSSBrowser" ).each( function ( index ) {
		var $CSSBrowserRevealer = $( this ).find( ".CSSBrowserRevealer" );
		if ( $CSSBrowserRevealer.index() === -1 ) {
			return false;
		}
		setSMAnim2(
			[
				TweenMax.fromTo(
					$CSSBrowserRevealer,
					4, {
						y: "0%",
					}, {
						y: "100%",
						ease: Power4.easeOut,
					}
				),
			],
			this,
			0.7,
			"80%",
			undefined,
			true
		);
	} );
	$( ".CS-MacBookWrap" ).each( function ( index ) {
		var $this = $( this ),
			obj = {
				x: "100%",
				scale: 1.1,
				autoAlpha: 0,
				ease: Expo.easeOut,
			};
		if (
			$this.prev().hasClass( "CS-MacBookWrap" ) &&
			index % 2 !== 0 &&
			index !== 0
		) {
			obj = {
				x: "-90%",
				scale: 1.1,
				autoAlpha: 0,
				ease: Expo.easeOut,
			};
		}
		setSMAnim2( [ TweenMax.from( this, 0.6, obj ) ], this, 0.8, 0, undefined, false );
	} );
	TweenMax.set( [ ".CS-iPad", ".CS-MacBookWrap", ".CS-iPad" ], {
		transformOrigin: "center center",
	} );
	$( ".CS-manyiPadsWrap,.CS-MobileDevicesWrap" ).each( function ( index ) {
		var $t = $( this );
		$t.find( ".CS-iPad" ).each( function ( index2 ) {
			var opt = {
				x: "50%",
				scale: 0.5,
				ease: Power4.easeOut,
				ease: Expo.easeOut,
			};
			if ( index2 % 2 !== 0 && $( this ).prev().hasClass( "CS-iPad" ) ) {
				opt = {
					x: "-50%",
					scale: 0.5,
					ease: Power4.easeOut,
					ease: Expo.easeOut,
				};
			}
			setSMAnim2(
				[ TweenMax.from( this, 0.6, opt ) ],
				this,
				0.99,
				0,
				undefined,
				false
			);
		} );
		$t.find( ".CS-iPhone" ).each( function ( index3 ) {
			var opt = {
				x: "100%",
				scale: 0.5,
				ease: Power4.easeOut,
				ease: Expo.easeOut,
			};
			if ( index3 % 2 !== 0 && $( this ).prev().hasClass( "CS-iPhone" ) ) {
				opt = {
					x: "-100%",
					scale: 0.5,
					ease: Power4.easeOut,
					ease: Expo.easeOut,
				};
			}
			setSMAnim2(
				[ TweenMax.from( this, 0.6, opt ) ],
				this,
				0.99,
				0,
				undefined,
				false
			);
		} );
		setSMAnim2(
			[
				TweenMax.from( this, 1, {
					autoAlpha: 0,
				} ),
			],
			this,
			0.9,
			0,
			undefined,
			false
		);
	} );
	$( ".CSSBrowserWrap.CS-DarkShadowWrap" ).each( function ( index ) {
		var DarkShadow = $( this ).find( ".CS-DarkShadow" );
		setSMAnim2(
			[
				TweenMax.fromTo(
					DarkShadow,
					10, {
						y: "40%",
					}, {
						y: "-150%",
						ease: Power3.easeInOut,
					}
				),
			],
			this,
			0.95,
			"200%",
			undefined,
			true
		);
	} );
	$( ".CS-Cover" ).each( function ( index ) {
		$this = $( this );
		setSMAnim2(
			[
				TweenMax.fromTo(
					$this.find( ".CS-Cover-front" ),
					1800, {
						y: "35%",
					}, {
						y: "0%",
						ease: Power2.easeInOut,
					}
				),
				TweenMax.fromTo(
					$this.find( ".CS-Cover-blurred" ),
					1300, {
						y: "0%",
					}, {
						y: "-10%",
						ease: Power1.easeInOut,
					}
				),
			],
			this,
			0.6,
			"85%",
			undefined,
			true
		);
	} );
};
( function ( w ) {
	var $teleportAnim = $( "<div></div>" );
	$teleportAnim.attr( {
		id: "teleportAnim",
		role: "presentation",
	} );
	for ( var i = 1; i <= 4; i++ ) {
		var $div = $( "<div></div>" );
		$teleportAnim.append( $div );
	}
	$( "body" ).append( $teleportAnim );
	var $first = $( "#teleportAnim :first-child" ),
		$second = $( "#teleportAnim :nth-child(2)" ),
		$third = $( "#teleportAnim :nth-child(3)" ),
		$fourth = $( "#teleportAnim :nth-child(4)" ),
		$main = $( "#main" ),
		$nav = $( "#nav" ),
		$hamburger = $( "#hamburger" ),
		$html = $( "html" ),
		$projectDetailsModal = $( "#projectDetailsModal" ),
		lastFocus = document.activeElement;
	TweenMax.set( [ $projectDetailsModal, $teleportAnim, $nav ], {
		x: "100%",
		y: 0,
		visibility: "visible",
	} );
	TweenMax.set( [ $first, $second, $third, $fourth ], {
		x: "100%",
		y: 0,
	} );

	function transitionPage(
		$elementFrom,
		$elementTo,
		animStartCallBack,
		animFinalCallBack,
		direction
	) {
		w.$ani.isNavBtnClickable = false;

		var _animStartCallBack = animStartCallBack ?
			animStartCallBack :
			function () {},
			_animFinalCallBack;
		if ( animFinalCallBack === undefined ) {
			_animFinalCallBack = function () {
				w.$ani.isNavBtnClickable = true;
			};
		} else {
			_animFinalCallBack = function () {
				animFinalCallBack();
				w.$ani.isNavBtnClickable = true;
			};
		}
		startTeleportAnim(
			$elementFrom,
			$elementTo,
			_animStartCallBack,
			_animFinalCallBack,
			direction
		);
		if ( $elementFrom === $projectDetailsModal ) {}
	}

	function startTeleportAnim(
		$elementTo,
		$elementFrom,
		animStartCallBack,
		animFinalCallBack,
		direction
	) {
		var Anim = new TimelineMax(),
			elementTo_Init,
			elementTo_F = {
				x: "0%",
				ease: Power1.easeOut,
			},
			elementFrom_F,
			teleportAnim_Init,
			teleportAnimDIV_F;
		if ( direction ) {
			switch ( direction ) {
				case "reverse":
					elementFrom_F = {
						x: "100%",
						ease: Expo.easeIn,
					};
					teleportAnim_Init = {
						x: "-100%",
						y: "0%",
					};
					teleportAnimDIV_F = {
						x: "100%",
						ease: Expo.easeInOut,
					};
					break;
				case "":
					break;
			}
		} else {
			elementFrom_F = {
				x: "-100%",
				ease: Power3.easeIn,
			};
			teleportAnim_Init = {
				x: "100%",
				y: "0%",
			};
			teleportAnimDIV_F = {
				x: "-100%",
				ease: Power2.easeIn,
			};
		}
		TweenMax.set(
			[ $teleportAnim, $elementTo, $first, $second, $third, $fourth ],
			teleportAnim_Init
		);
		TweenMax.set( $elementFrom, {
			"z-index": 80,
			x: "0%",
			y: "0%",
		} );
		TweenMax.set( $teleportAnim, {
			"z-index": 90,
		} );
		TweenMax.set( $elementTo, {
			"z-index": 100,
		} );
		Anim.addCallback( animStartCallBack )
			.to( $elementFrom, 1.1, elementFrom_F )
			.to( $first, 0.9, teleportAnimDIV_F, "0" )
			.to( $second, 0.7, teleportAnimDIV_F, "0.7" )
			.to( $third, 0.6, teleportAnimDIV_F, "1.2" )
			.to( $fourth, 0.5, teleportAnimDIV_F, "1.7" )
			.to( $elementTo, 0.4, elementTo_F, "2" )
			.addCallback( animFinalCallBack, "1.9" );
	}

	function staggerNavItems() {
		TweenMax.staggerFromTo(
			"#nav li",
			1.2, {
				scale: 0.8,
				cycle: {
					x: function ( i ) {
						return -i * 20;
					},
					y: function ( i ) {
						return -i * 5;
					},
				},
				opacity: 0,
			}, {
				opacity: 1,
				x: 0,
				y: 0,
				scale: 1,
				ease: Elastic.easeInOut,
			},
			0.1
		);
	}
	$hamburger.click( function () {
		if ( !w.$ani.isNavBtnClickable ) return false;
		if ( !$hamburger.hasClass( "clicked" ) ) {
			changeModalAria( $nav, $main );
			transitionPage(
				$nav,
				$main,
				function () {},
				function () {
					staggerNavItems();
				}
			);
		} else {
			if ( $html.attr( "data-section-active" ) === "projectDetailsModal" ) {
				changeModalAria( $main, $projectDetailsModal, "reverse" );
				transitionPage(
					$main,
					$projectDetailsModal,
					function () {
						$hamburger.blur();
						w.$ani.visits.init( "closing Proj through nav button" );
					},
					function () {
						$( "#projectDetailsModal" ).html( "" );
					},
					"reverse"
				);
			} else {
				changeModalAria( $main, $nav, "reverse" );
				transitionPage(
					$main,
					$nav,
					function () {
						$hamburger.blur();
					},
					function () {},
					"reverse"
				);
			}
		}
		return false;
	} );

	function changeModalAria( $inElem, $outElem, reverse ) {
		if ( reverse ) {
			$( lastFocus ).focus();
			$hamburger.attr( "aria-pressed", "false" ).removeClass( "clicked" );
		} else {
			lastFocus = document.activeElement;
			$inElem.focus();
			$hamburger.attr( "aria-pressed", "true" ).addClass( "clicked" );
		}
		if ( $( "html" ).attr( "data-section-active" ) === "main" ) {
			$( "html" ).css( "overflow", "hidden" );
			$( "html" ).attr( "data-section-active", $inElem.attr( "id" ) );
		} else {
			$( "html" ).css( {
				"overflow-x": "hidden",
				"overflow-y": "auto",
			} );
			$( "html" ).attr( "data-section-active", "main" );
		}
		$inElem.attr( {
			tabindex: "0",
			"aria-hidden": "false",
		} );
		$outElem.attr( {
			tabindex: "-1",
			"aria-hidden": "true",
		} );
	}
	w.$ani.visits = {
		history: [],
		pageState: {
			page: "",
			title: "",
			type: "",
		},
		initTitle: "Prashant Sani: Front-end Web Developer | HTML5, CSS3, SVG , Scroll Websites| PSD to HTML | Coaching & Training",
		initObj: {
			page: "index",
			title: "index",
			type: "index",
		},
		init: function ( navBtn ) {
			this.pageState = {
				page: "index",
				title: this.initTitle,
				type: "index",
			};
			if ( !!navBtn ) {
				window.history.pushState( this.initObj, this.initTitle, "../" );
			} else {
				window.history.replaceState( this.initObj, this.initTitle, "" );
			}
			this.history.push( "index" );
		},
		add: function ( href, title, type, direction ) {
			if ( window.history && window.history.pushState ) {
				if ( type === undefined ) {
					var type = "";
				}
				if ( direction !== "back" ) {
					window.history.pushState( {
							page: href,
							title: title,
							type: type,
						},
						"Prashant Sani: " + type + title,
						href
					);
					this.history.push( href );
				}
				this.pageState = {
					page: href,
					title: title,
					type: type,
				};
			}
		},
		hasBack: function () {
			return this.history.length > 1;
		},
		popstate: function ( stateObj ) {
			if ( !( window.history && window.history.pushState ) ) {
				return false;
			}
			if ( stateObj.type === "projects" ) {
				if ( $html.attr( "data-section-active" ) === "main" ) {
					$html.attr( "data-section-active", "main" );
					TweenMax.to( $( "body" ), 0.4, {
						autoAlpha: 0,
						ease: Power3.easeInOut,
						onComplete: function () {
							changeModalAria( $projectDetailsModal, $main );
							TweenMax.set( $projectDetailsModal, {
								"z-index": 100,
								x: "0%",
							} );
							TweenMax.set( [ $teleportAnim, $main ], {
								x: "100%",
							} );
							TweenMax.to( $( "body" ), 0.4, {
								autoAlpha: 1,
								ease: Power3.easeIn,
							} );
						},
					} );
				} else {
					$ani.loadProj(
						stateObj.page,
						stateObj.title,
						stateObj.type,
						"noupdate"
					);
					$( "html" ).css( {
						overflow: "hidden",
					} );
				}
			} else {
				TweenMax.to( $( "body" ), 0.5, {
					autoAlpha: 0,
					ease: Power3.easeInOut,
					onComplete: function () {
						changeModalAria( $main, $projectDetailsModal, "reverse" );
						TweenMax.set( $main, {
							"z-index": "100",
							x: "0%",
						} );
						TweenMax.set( [ $teleportAnim, $projectDetailsModal ], {
							x: "100%",
							"z-index": 70,
						} );
						$( "html" ).css( {
							"overflow-x": "hidden",
							"overflow-y": "auto",
						} );
						TweenMax.to( $( "body" ), 0.4, {
							autoAlpha: 1,
							ease: Power3.easeIn,
						} );
					},
				} );
			}
		},
		clear: function () {
			this.history = [];
		},
	};
	$( document ).on( "click", "#nav a", function ( event ) {
		event.preventDefault();
		var target = this.hash,
			$target = $( target ),
			dur = Math.abs( window.pageYOffset - $target.offset().top );
		if ( dur > 1000 ) {
			dur = 1000;
		}
		$target.focus();
		$hamburger.click();
		setTimeout( function () {
			$( "html,body" ).stop().animate( {
					scrollTop: $target.offset().top,
				},
				dur
			);
		}, 1000 );
		return false;
	} );
	w.$ani.loadProj = function ( href, title, pathPrefix, direction ) {
		if ( $html.attr( "data-section-active" ) === "projectDetailsModal" ) {
			href = href.replace( "projects/", "" );
		}
		$.ajax( {
			dataType: "html",
			url: href,
			cache: false,
			success: function ( data ) {
				var $div = $( "<div></div>" ),
					$projectDetailsModal = $( "#projectDetailsModal" ),
					$x;
				$div.append( data );
				if ( pathPrefix ) {
					w.$ani.runWebPImgs( $div.find( "main" ), pathPrefix );
				} else {
					w.$ani.runWebPImgs( $div.find( "main" ) );
				}

				function appendData() {
					$x = $div.find( "main" );
					$x.attr( "id", "projectDetailsModalContent" );
					TweenMax.set( $x, {
						autoAlpha: 0,
					} );
					setTimeout( function () {
						$projectDetailsModal.append( $x );
						TweenMax.to( $( "#projectDetailsModalContent" ), 0.5, {
							autoAlpha: 1,
							ease: Power2.easeInOut,
						} );
						w.$ani.initCSAnims();
					}, 20 );
				}
				if ( direction !== "noupdate" ) {
					w.$ani.visits.add( href, title, "projects", direction );
				}
				if ( $( "#projectDetailsModalContent" ).index() !== -1 ) {
					$projectDetailsModalContent = $( "#projectDetailsModalContent" );
					TweenMax.to( $projectDetailsModalContent, 0.5, {
						autoAlpha: 0,
						onComplete: function () {
							$projectDetailsModalContent.remove();
							appendData();
						},
						ease: Power2.easeInOut,
					} );
				} else {
					appendData();
				}
			},
		} );
	};

	$( document ).on( "click", "#CS-projectsList .openPortfolio", function ( event ) {
		event.preventDefault();
		var $this = $( this );
		var href = $( this ).attr( "href" ),
			title = $this.parents( "li" ).find( ".projListName" ).html(),
			$projectDetailsModalContent = $( "#projectDetailsModalContent" ),
			$projectDetailsModal = $( "#projectDetailsModal" );
		if ( href === undefined || href === "" ) {
			href = $this.parents( "li" ).find( "a" ).attr( "href" );
		}
		if ( $projectDetailsModal.index() === -1 ) {
			window.location = href;
		}
		TweenMax.to( $projectDetailsModalContent, 0.3, {
			autoAlpha: 0,
			onComplete: function () {
				$projectDetailsModalContent.html( "<h1>loading</h1>" );
				TweenMax.to( $projectDetailsModalContent, 0.3, {
					autoAlpha: 1,
				} );
				w.$ani.loadProj(
					href,
					title,
					"",
					"Click from link inside Project Modal"
				);
			},
		} );
		return false;
	} );
	$( "#nav a" ).focus( function () {
		if ( $( "#nav" ).attr( "aria-hidden" ) === true ) {}
	} );
	$( document ).on( "click", ".backToHome", function ( event ) {
		if ( $html.hasClass( "index" ) ) {
			event.preventDefault;
			$hamburger.click();
			return false;
		}
	} );
	if ( $html.hasClass( "index" ) ) {
		w.$ani.visits.init();
		if ( !!( window.history && window.history.pushState ) ) {
			window.addEventListener( "popstate", function ( event ) {
				if ( !event.state ) {
					return;
				}
				w.$ani.visits.popstate( event.state );
			} );
		}
		$( document ).on( "click", "#mainLogo", function ( event ) {
			event.preventDefault;
			if ( $( "html" ).attr( "data-section-active" ) !== "main" ) {
				$hamburger.click();
			} else {
				$( "html" ).stop().animate( {
						scrollTop: 0,
					},
					700
				);
			}
			return false;
		} );
	}

	function changeCSS( w ) {
		if ( !Modernizr.cssvhunit ) {
			$( "#nav" ).css( "font-size", "44px" );
		}
		var adjustedNavFontSize = parseInt( ( w.$ani.winWidth * 0.6 ) / 4.5 ),
			navTop = parseInt( w.$ani.winHeight / 5 ) + "px",
			navLeft = "12.5%";
		if ( w.$ani.aspectRatio > 0.8 ) {
			adjustedNavFontSize = parseInt( ( w.$ani.winHeight * 0.4 ) / 4.5 );
		}
		if ( w.winWidth > 1430 ) {
			navLeft = parseInt( ( w.$ani.winWidth - 1300 ) / 2 ) + "px";
		}
		if ( w.winHeight < 350 ) {
			( navTop = "100px" ), ( navLeft = parseInt( w.winWidth / 20 ) + "px" );
		}
		$( "#nav ul" ).css( {
			top: navTop,
			left: navLeft,
		} );
		$( "#nav" ).css( {
			"font-size": adjustedNavFontSize + "px",
		} );
	}
	$( w ).on( "load", function () {
		$ani.reInitValues( w );
		changeCSS( w );
	} );
	$( w ).on( "resize", function () {
		$ani.reInitValues( w );
		changeCSS( w );
	} );
} )( window );

let backimg = document.querySelector( ".home-svgimg" );

let wrapper = document.querySelector( '.main__wrapper' );
setTimeout( function loader() {
	wrapper.style.display = "block";
}, 900 )

function visible() {
	backimg.classList.toggle( "visible" );
}
setTimeout( visible, 3200 );