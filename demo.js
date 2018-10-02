let nowIndex = 0
let itemWidth = 520
let len = 5
let timer
let flag = true
init()

function init() {
    bindEvent()
    sliderAuto()
}

function bindEvent() {
    $('.order').add('.prevBtn').add('.nextBtn').on('click', function () {
        if ($(this).attr('class') == 'prevBtn') {
            move('prev')
        } else if ($(this).attr('class') == 'nextBtn') {
            move('next')
        } else {
            var index = $(this).index()
            move(index)
        }
        changeStyle() /*改变小圆点*/
    })

    $('.wrapper').on('mouseenter', function () {
        $('.btn').show()
        clearInterval(timer)
    }).on('mouseleave', function () {
        $('.btn').hide()
        sliderAuto()
    })
}

function move(dir) {
    if (flag) {
        flag = false
        if (dir == 'prev') {
            if (nowIndex == 0) {
                $('.img-box').css('left', -(len * itemWidth))
                nowIndex = len - 1
            } else {
                nowIndex--
            }
        } else if (dir == 'next') {
            if (nowIndex == 4) {
                $('.img-box').animate({
                    'left': -(len * itemWidth)
                }, function () {
                    $(this).css('left', 0)
                })
                nowIndex = 0
            } else {
                nowIndex++
            }
        } else {
            nowIndex = dir
        }
        slider()
    }
}

function slider() {
    $('.img-box').animate({
        'left': -(itemWidth * nowIndex)
    }, function () {
        sliderAuto() /*自动轮播*/
        flag = true
    })
}

function changeStyle() {
    $('.active').removeClass('active')
    $('.order li').eq(nowIndex).addClass('active')
}

function sliderAuto() {
    clearInterval(timer)
    timer = setInterval(function () {
        move('next')
    }, 1500)
    changeStyle()
}