class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        //  Red Bezier Curve 1
        this.drawBezierCurve({x: 50, y: 500}, {x: 100, y: 300}, {x: 200, y: 300}, {x: 250, y: 500}, this.num_curve_sections, [255, 0, 0, 255], framebuffer);


        //  Blue Bezier Curve 2
        this.drawBezierCurve({x: 100, y: 200}, {x: 50, y: 400}, {x: 250, y: 400}, {x: 200, y: 200}, this.num_curve_sections, [0, 0, 255, 255], framebuffer);

    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        // make sure to use this.num_curve_sections to set the number of edges for each circle

        this.drawCircle({x: 300, y: 300}, 50, this.num_curve_sections, [0, 255, 0, 255], framebuffer);

        this.drawCircle({x: 500, y: 500}, 50, this.num_curve_sections, [0, 0, 255, 255], framebuffer);


    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        // draws a red house
        let vertices1 = [{x: 100, y: 100}, {x: 200, y: 100}, {x: 200, y: 200}, {x: 150, y: 250}, {x: 100, y: 200}];

        let vertices2 = [{x: 350, y: 150}, {x: 500, y: 150}, {x: 500, y: 400}, {x: 425, y: 375}, {x: 550, y: 300}, {x: 575, y: 225}];

        // draws a horizontal trapezoid with a vertical trapezoid connected to the right side
        this.drawConvexPolygon(vertices1, [255, 0, 0, 255], framebuffer);
        this.drawConvexPolygon(vertices2, [0, 0, 255, 255], framebuffer);

        // When "Show Point Data" is checked, draws Xs on each of the polygon's vertices
        if (this.show_points) {
            let vertices1Counter = 0;
            let vertices2Counter = 0;
            while (vertices1Counter < vertices1.length && vertices2Counter < vertices2.length) {
                this.drawVertex(vertices1[i], [0, 0, 0, 255], framebuffer);
                vertices1Counter++;
                this.drawVertex(vertices2[i], [0, 0, 0, 255], framebuffer);
                vertices2Counter++;
            }

            // for (let i = 0; i < vertices1.length; i++) {
            //     this.drawVertex(vertices1[i], [0, 0, 0, 255], framebuffer);
            // }
            // for (let i = 0; i < vertices2.length; i++) {
            //     this.drawVertex(vertices2[i], [0, 0, 0, 255], framebuffer);
            // }
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        // Name: isaac
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        // Use lines for letter "i"
        this.drawLine({x: 100, y: 200}, {x: 100, y: 300}, [255, 0, 0, 255], framebuffer);

        // Use convex polygon to draw a triangle do for the letter "i"
        // dot should be above y=300
        this.drawConvexPolygon([{x: 75, y: 310}, {x: 130, y: 310}, {x: 100, y: 335}], [255, 0, 0, 255], framebuffer);

        // Use Bezier curves for letter "s"
        this.drawBezierCurve({x: 150, y: 250}, {x: 100, y: 200}, {x: 200, y: 200}, {x: 150, y: 250}, this.num_curve_sections, [0, 255, 0, 255], framebuffer);

        // Use circle for letter first "a"
        this.drawBezierCurve({x: 200, y: 250}, {x: 250, y: 200}, {x: 300, y: 200}, {x: 250, y: 250}, this.num_curve_sections, [0, 255, 0, 255], framebuffer);

        // Use line for first "a" tail
        this.drawLine({x: 400, y: 300}, {x: 300, y: 200}, [255, 0, 0, 255], framebuffer);

        // Use circle curves for letter second "a"
        this.drawBezierCurve({x: 300, y: 250}, {x: 350, y: 200}, {x: 400, y: 200}, {x: 350, y: 250}, this.num_curve_sections, [0, 255, 0, 255], framebuffer);

        // Use line for second "a" tail
        this.drawLine({x: 100, y: 200}, {x: 100, y: 300}, [255, 0, 0, 255], framebuffer);

        // Use Bezier curves for letter "c"

        
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        let previousX = p0.x;
        let previousY = p0.y;
        let previousPoint = {x: previousX, y: previousY};
        

        for (let i = 0; i <= num_edges; i++){
            let t = i / num_edges;
            let currentX = Math.round((1-t)**3 * p0.x + 3*(1-t)**2 * t * p1.x + 3*(1-t) * t**2 * p2.x + t**3 * p3.x);
            let currentY = Math.round((1-t)**3 * p0.y + 3*(1-t)**2 * t * p1.y + 3*(1-t) * t**2 * p2.y + t**3 * p3.y);
            let currentPoint = {x: currentX, y: currentY};
            this.drawLine({x: previousX, y: previousY}, {x: currentX, y: currentY}, color, framebuffer);
            previousPoint = currentPoint;
        }


        if (this.show_points) {
            this.drawVertex(p0, [0, 0, 0, 255], framebuffer);
            this.drawVertex(p1, [75, 75, 75, 255], framebuffer);
            this.drawVertex(p2, [75, 75, 75, 255], framebuffer);
            this.drawVertex(p3, [0, 0, 0, 255], framebuffer);
        }

        
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle

        let pi = Math.PI;
        var cartesianCoordinatesList = [];


        // need to calculate the angle during every iteration
        
        for (let i = 0; i <= num_edges; i++) {
            let polarAngle = null;
            let currentOuterPoint = {
                x: Math.round(center.x + radius * Math.cos(polarAngle)),
                y: Math.round(center.y + radius * Math.sin(polarAngle))
            };
            if (cartesianCoordinatesList.includes(currentOuterPoint)) {
                break;
            }
            cartesianCoordinatesList.push(currentOuterPoint);
        }

        // for loop that draws the lines given the circle's outer points
        let previousPoint = cartesianCoordinatesList[0];
        for (let point = 0; point < cartesianCoordinatesList.length; point++) {
            this.drawLine(previousPoint, {x: cartesianCoordinatesList[point].x, y: cartesianCoordinatesList[point].y}, color, framebuffer);
            if (this.show_points) {
            this.drawVertex(point, [0, 0, 0, 255], framebuffer);
            }
        }

    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        // Assumes vertex_list contains 3 or more vertices

        let startVertex = vertex_list[0];

        for (let i = 1; i < vertex_list.length - 1; i++) {
            let primaryVertex = vertex_list[i];
            let secondaryVertex = vertex_list[i + 1];
            this.drawTriangle(startVertex, primaryVertex, secondaryVertex, color, framebuffer);
        }
        
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // draws an X centered at the vertex positioned at 'v'
        // first line is from (x-5, y-5) to (x+5, y+5), which has a positive slope
        this.drawLine({x: Math.round(v.x - 5), y: Math.round(v.y - 5)}, {x: Math.round(v.x + 5), y: Math.round(v.y + 5)}, color, framebuffer);

        // second line is from (x-5, y+5) to (x+5, y-5), which has a negative slope
        this.drawLine({x: Math.round(v.x - 5), y: Math.round(v.y + 5)}, {x: Math.round(v.x + 5), y: Math.round(v.y - 5)}, color, framebuffer);
        
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
