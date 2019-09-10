<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class GameController
{

    /**
     * @Route("/game1")
     * @param Environment $twig
     * @return Response
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function game1(Environment $twig)
    {
        return new Response($twig->render("Game1/game.html.twig"));
    }

    /**
     * @Route("/game2")
     * @param Environment $twig
     * @return Response
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function game2(Environment $twig)
    {
        return new Response($twig->render("Game2/game.html.twig"));
    }

    /**
     * @Route("/game3")
     * @param Environment $twig
     * @return Response
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function game3(Environment $twig)
    {
        return new Response($twig->render("Game3/game.html.twig"));
    }
}